import { isIsoDate } from './../../../helpers/validation';
import { getUser } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import ItemService from '../../../services/ItemService';

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    itemId: string;
    shopId: string;
    from: string;
    to: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { itemId, shopId, from, to } = req.query;

      if (
        !from ||
        !to ||
        !shopId ||
        !itemId ||
        isNaN(+shopId) ||
        isNaN(+itemId) ||
        !isIsoDate(from) ||
        !isIsoDate(to)
      ) {
        throw ApiError.badRequest('Неверные параметры запроса!');
      }

      const user = await getUser(req);
      const movements = await ItemService.getMovements({
        itemId: +itemId,
        shopId: +shopId,
        from,
        to,
      });

      return res.status(200).json(movements);
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
