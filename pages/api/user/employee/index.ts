import { IShop } from '../../../../models/shop';
import { validateToken } from '../../../../helpers/token';
import { UserRole } from '../../../../types/user';
import { NextApiRequest, NextApiResponse } from 'next';
import UserService from '../../../../services/UserService';
import ApiError, { handleServerError } from '../../../../helpers/error';
import PermissionService from '../../../../services/PermissionService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    email: string;
    shop: IShop;
  };
  query: {
    shopId?: string;
  };
  cookies: {
    accessToken?: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Invite employee
    const { email, shop } = req.body;
    const token = req.cookies.accessToken;

    if (!token) {
      throw ApiError.notAuthenticated('Пользователь не авторизован!');
    }

    try {
      const user = await validateToken(token, process.env.JWT_ACCESS_SECRET);

      if (user.role !== UserRole.OWNER) {
        throw ApiError.notAuthorized('Не достаточно прав доступа!');
      }

      const from = `${user.name} (${user.email})`;

      const employee = await UserService.invite(email, from, shop);

      return res.status(201).json(employee);
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'GET') {
    // Get list of company cashiers
    try {
      const { shopId } = req.query;
      const token = req.cookies.accessToken;

      if (!shopId) {
        throw ApiError.badRequest('Не указан id точки продаж');
      }

      if (!token) {
        throw ApiError.notAuthenticated('Пользователь не авторизован');
      }

      const userData = await validateToken(
        token,
        process.env.JWT_ACCESS_SECRET
      );

      if (userData.role !== UserRole.OWNER) {
        throw ApiError.notAuthorized('Недостаточно прав!');
      }

      const users = await PermissionService.getShopCashiers(+shopId);
      return res.status(200).json(users);
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
