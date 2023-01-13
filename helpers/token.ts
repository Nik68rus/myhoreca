import { jwtVerify, SignJWT } from 'jose';
import { TokenPayload } from '../types/user';

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
