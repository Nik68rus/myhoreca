import { IItemInput } from './../../../types/item';
import { IItem } from './../../../models/item';
import { validateToken } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import CompanyService from '../../../services/ShopService';
import PermissionService from '../../../services/PermissionService';
import ItemService from '../../../services/ItemService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IItemInput;
  cookies: {
    accessToken?: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { title, imageUrl, isCountable } = req.body;

    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json('Пользователь не авторизован!');
    }

    try {
      const user = await validateToken(token, process.env.JWT_ACCESS_SECRET);
      const item = await ItemService.create({
        userId: user.id,
        title,
        imageUrl,
        isCountable,
      });
      return res.status(201).json(item);
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'GET') {
    try {
      const token = req.cookies.accessToken;

      if (!token) {
        throw ApiError.notAuthenticated('Пользователь не авторизован');
      }

      const user = await validateToken(token, process.env.JWT_ACCESS_SECRET);

      const items = await ItemService.getItems(user.id);
      return res.status(200).json(items);
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
