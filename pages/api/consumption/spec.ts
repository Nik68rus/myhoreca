import { IConsumptionInput } from '../../../types/item';
import { getUser } from '../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import ConsumptionService from '../../../services/ConsumptionService';
import { isIsoDate } from '../../../helpers/validation';

export interface SpecParams {
  from: string;
  to: string;
  shopId: number;
  type: 'writeoff' | 'discount';
}

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IConsumptionInput;
  query: {
    from: string;
    to: string;
    shopId: string;
    type: 'writeoff' | 'discount';
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { from, to, shopId, type } = req.query;

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

      await getUser(req);

      const history = await ConsumptionService.getSpecHistory({
        shopId: +shopId,
        type,
        from,
        to,
      });
      return res.status(200).json(history);
    } catch (error) {
      handleServerError(res, error);
    }
  }
}
