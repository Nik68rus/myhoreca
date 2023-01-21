import { getAdmin, getUser } from './../../../helpers/token';
import { IShop } from '../../../models/shop';
import { NextApiRequest, NextApiResponse } from 'next';
import { handleServerError } from '../../../helpers/error';
import ShopService from '../../../services/ShopService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IShop;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Создание новой точки продаж
    const { title } = req.body;
    try {
      const user = await getAdmin(req);
      const shop = await ShopService.create(title, user.spaceId, user.id);
      return res.status(201).json(shop);
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'GET') {
    // получение всех точек продаж пространства
    try {
      const user = await getUser(req);
      const shops = await ShopService.getShops(user.spaceId);
      return res.status(200).json(shops);
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
