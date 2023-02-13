import { NextApiRequest, NextApiResponse } from 'next';
import { handleServerError } from '../../../helpers/error';
import ShopService from '../../../services/ShopService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // получение списка всех точек продаж (гостю для просмотра меню)
    try {
      const shops = await ShopService.getShops();
      return res.status(200).json(shops);
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
