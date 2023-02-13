import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import GroupService from '../../../services/GroupService';
import ShopService from '../../../services/ShopService';

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    shopId: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // получение ассортимента точки продаж
    try {
      const { shopId } = req.query;

      if (!shopId || isNaN(+shopId)) {
        throw ApiError.badRequest('Не указан ID точки!');
      }
      const items = await ShopService.getMenu(+shopId);
      const groups = await GroupService.getShopGroups(+shopId);
      return res.status(200).json({ items, groups });
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
