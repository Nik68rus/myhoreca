import { UserRole } from './../types/user';
import { NextApiRequest } from 'next';
import { jwtVerify, SignJWT } from 'jose';
import { TokenPayload } from '../types/user';
import ApiError from './error';

export const validateToken = async (token: string, secret: string) => {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  return payload as unknown as TokenPayload;
};

export const generateToken = async (
  payload: TokenPayload,
  secret: string,
  duration: number
) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + duration;

  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));

  return token;
};

export const getUser = async (req: NextApiRequest) => {
  const token = req.cookies.accessToken;

  if (!token) {
    throw ApiError.notAuthenticated('Пользователь не авторизован!');
  }
  let user;
  try {
    user = await validateToken(token, process.env.JWT_ACCESS_SECRET);
  } catch (err) {
    throw ApiError.notAuthenticated('Токен не валидный!');
  }
  return user;
};

export const getAdmin = async (req: NextApiRequest) => {
  const user = await getUser(req);

  if (user.role !== UserRole.OWNER) {
    throw ApiError.notAuthorized('Недостаточно прав!');
  }
  return user;
};
