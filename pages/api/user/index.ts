import { Routes } from './../../../types/routes';
import { getCookie, setCookie } from './../../../helpers/cookies';
import { IUserLoginData } from '../../../types/user';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import db from '../../../models';
import UserService from '../../../services/UserService';
import tokenService from '../../../services/TokenService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IUserLoginData;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await db.users.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json('Пользователь не найден!');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const data = await UserService.generateData(user);
      return res.status(200).json(data);
    } else {
      return res.status(401).json('Неверное имя пользователя или пароль!');
    }
  }

  if (req.method === 'GET') {
    const authHeader = req.headers.authorization;
    let token;
    let userData;
    if (authHeader) {
      token = authHeader?.split(' ')[1];
    }
    if (token) {
      userData = await tokenService.validateAccessToken(token);
    }

    return res.status(200).json(userData);
    // if (userData) {
    // } else {
    //   res.redirect(Routes.LOGIN);
    // }
  }
}
