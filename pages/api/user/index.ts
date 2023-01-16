import { validateToken } from './../../../helpers/token';
import { IUserLoginData } from '../../../types/user';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import db from '../../../models';
import UserService from '../../../services/UserService';
import ApiError, { handleServerError } from '../../../helpers/error';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IUserLoginData;
  query: {
    code?: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Login user
    const { email, password } = req.body;
    try {
      const user = await db.users.findOne({ where: { email } });

      if (!user) {
        throw ApiError.notFound('Пользователь не найден!');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const data = await UserService.generateData(user);
        return res.status(200).json(data);
      } else {
        throw ApiError.validation('Пароли не совпадают!');
      }
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'GET') {
    // Найти пользователя по коду инвайта
    try {
      const { code } = req.query;

      if (!code) {
        throw ApiError.badRequest('Не указан код инвайта');
      }

      const data = await UserService.findByCode(code);
      return res.status(200).json(data);
    } catch (error) {
      handleServerError(res, error);
    }
  }
}
