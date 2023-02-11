import { isIsoDate } from './../../../helpers/validation';
import { getUser } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import CupService from '../../../services/CupService';

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
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
      const { shopId, from, to } = req.query;

      if (
        !from ||
        !to ||
        !shopId ||
        isNaN(+shopId) ||
        !isIsoDate(from) ||
        !isIsoDate(to)
      ) {
        throw ApiError.badRequest('Неверные параметры запроса!');
      }

      const user = await getUser(req);
      const stat = await CupService.getStat({
        shopId: +shopId,
        from,
        to,
      });

      return res.status(200).json(stat);
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
