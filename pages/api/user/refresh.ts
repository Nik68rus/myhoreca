import { TokenPayload, IUserAuthData } from './../../../types/user';
import { validateToken } from './../../../helpers/token';
import { Routes } from './../../../types/routes';
import { getCookie, setCookie } from './../../../helpers/cookies';
import { IUserLoginData } from '../../../types/user';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import db from '../../../models';
import UserService from '../../../services/UserService';
import tokenService from '../../../services/TokenService';

interface ExtendedApiRequest extends NextApiRequest {
  query: {
    from: string;
  };
  cookies: {
    accessToken?: string;
    refreshToken?: string;
  };
}

export default async function handler(
  req: ExtendedApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { from } = req.query;
    const token = req.cookies.refreshToken?.toString().trim();

    if (!token) {
      return res.redirect(Routes.LOGIN);
    }

    try {
      const data = await validateToken(token, process.env.JWT_REFRESH_SECRET);
      const user: TokenPayload = {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
        isActivated: data.isActivated,
      };

      const tokens = await tokenService.generateTokens(user);
      tokenService.saveTokens(user.id, tokens.refreshToken);

      const result: IUserAuthData = {
        ...user,
        ...tokens,
      };

      return res.status(200).json(result);
      // return res.json(data);
    } catch (error) {
      console.log(error);
      return res.redirect(Routes.LOGIN);
    }
  }
}
