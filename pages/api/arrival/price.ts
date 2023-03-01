import { getUser } from '../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import ItemService from '../../../services/ItemService';

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    itemId: string;
    shopId: string;
  };
}
export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { itemId, shopId } = req.query;

      if (!itemId || isNaN(+itemId) || !shopId || isNaN(+shopId)) {
        throw ApiError.badRequest(
          'Отсутствует или неверный id товара или точки продаж!'
        );
      }
      const user = await getUser(req);
      const lastPrice = await ItemService.getLastPrice(+shopId, +itemId);
      return res.status(200).json(lastPrice);
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
