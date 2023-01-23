import { UserRole } from './../../../types/user';
import { getUser } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../models';
import UserService from '../../../services/UserService';
import { IUser } from '../../../models/user';
import ApiError, { handleServerError } from '../../../helpers/error';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: Partial<IUser & { password2: string }>;
  cookies: {
    accessToken?: string;
  };
  query: {
    userId: string;
    code?: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    try {
      await db.sequelize.authenticate();
      await db.sequelize.sync();

      const token = req.cookies.accessToken;
      const userId = req.query.userId;
      const code = req.query.code;

      if (!((userId && code) || token)) {
        throw ApiError.notAuthenticated('Пользователь не авторизован!');
      }

      if (userId && code) {
        // Завершение регистрации и активация профиля
        const existingUser = await db.users.findOne({
          where: { activationCode: code },
        });

        if (!existingUser || !(existingUser.id === +userId)) {
          throw ApiError.badRequest('Неверные данные!');
        }

        const { name, password, password2 } = req.body;

        const normName = name!.trim();
        const normPassword = password!.trim();
        const normPassword2 = password2!.trim();

        if (
          normName.length < 3 ||
          normPassword.length < 5 ||
          normPassword !== normPassword2
        ) {
          throw ApiError.validation('Недопустимые значения!');
        }
        const newData = {
          id: +userId,
          name: normName,
          password: normPassword,
          isActivated: true,
        };
        const user = await UserService.update(newData);
        return res.status(200).json(user);
      }

      if (token) {
        const userData = await getUser(req);

        if (userData.role === UserRole.OWNER) {
          // Изменение другого пользователя адмиинистратором
          const user = await UserService.update(req.body);
          return res.status(200).json(user);
        }
        throw ApiError.notAuthorized('Недостаточно прав');
      }
    } catch (error) {
      handleServerError(res, error);
    }
  }
}
