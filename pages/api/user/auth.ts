import { getUser } from './../../../helpers/token';
import { IUserLoginData } from '../../../types/user';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import db from '../../../models';
import UserService from '../../../services/UserService';
import ApiError, { handleServerError } from '../../../helpers/error';
import TokenService from '../../../services/TokenService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IUserLoginData;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // Check auth
    try {
      const userData = await getUser(req);
      return res.status(200).json(userData);
    } catch (err) {
      return res.status(401).json('Пользователь не авторизован');
    }
  }
  if (req.method === 'POST') {
    // Login user
    const { email, password } = req.body;
    try {
      await db.sequelize.authenticate();
      await db.sequelize.sync();

      const user = await db.users.findOne({ where: { email } });

      if (!user) {
        throw ApiError.notFound('Пользователь не найден!');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw ApiError.notAuthorized('Неверное имя пользователя или пароль!');
      }

      const data = await UserService.generateData(user);
      const token = await TokenService.create(user.id, data.refreshToken);

      if (!token) {
        throw ApiError.internal('Ошибка при создании токена!');
      }
      return res.status(200).json(data);
    } catch (error) {
      handleServerError(res, error);
    }
  }
}
