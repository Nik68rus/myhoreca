import { UserRole } from './../../../types/user';
import { validateToken } from '../../../helpers/token';
import { IShop } from '../../../models/shop';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import PermissionService from '../../../services/PermissionService';
import ShopService from '../../../services/ShopService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IShop;
  cookies: {
    accessToken?: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Создание новой точки продаж
    const { title } = req.body;
    const token = req.cookies.accessToken;
    if (!token) {
      throw ApiError.notAuthenticated('Пользователь не авторизован!');
    }
    try {
      const user = await validateToken(token, process.env.JWT_ACCESS_SECRET);
      if (user.role !== UserRole.OWNER) {
        throw ApiError.notAuthorized('Недостаточно прав!');
      }
      const shop = await ShopService.create(title, user.spaceId, user.id);
      return res.status(201).json(shop);
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'GET') {
    // получение всех точек продаж пространства
    try {
      const token = req.cookies.accessToken;

      if (!token) {
        throw ApiError.notAuthenticated('Пользователь не авторизован!');
      }

      const user = await validateToken(token, process.env.JWT_ACCESS_SECRET);

      let shops: IShop[] = [];

      if (user.role === UserRole.OWNER) {
        shops = await ShopService.getShops(user.spaceId);
        return res.status(200).json(shops);
      }

      throw ApiError.notAuthorized('Недостаточно прав!');
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
