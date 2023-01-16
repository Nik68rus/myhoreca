import { validateToken } from './../../../helpers/token';
import { IUserLoginData } from '../../../types/user';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import db from '../../../models';
import UserService from '../../../services/UserService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IUserLoginData;
  cookies: {
    accessToken?: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // Check auth
    const token = req.cookies.accessToken;

    if (token) {
      try {
        const userData = await validateToken(
          token,
          process.env.JWT_ACCESS_SECRET
        );
        return res.status(200).json(userData);
      } catch (err) {
        return res.status(401).json('Токен не валидный');
      }
    } else {
      return res.status(401).json('Пользователь не авторизован');
    }
  }
}
