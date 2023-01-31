import { getUser } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import ConsumptionService from '../../../services/ConsumptionService';

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    shopId?: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const shopId = req.query.shopId as string;

      if (!shopId || isNaN(+shopId)) {
        throw ApiError.badRequest('Неверные параметры запроса!');
      }

      const user = await getUser(req);
      const result = await ConsumptionService.getLast(+shopId);
      return res.status(200).json(result);
    } catch (error) {
      handleServerError(res, error);
    }
  }
}
