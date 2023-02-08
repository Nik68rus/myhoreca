import { IConsumptionInput } from './../../../types/item';
import { getUser } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import ConsumptionService from '../../../services/ConsumptionService';
import { isIsoDate } from '../../../helpers/validation';

export interface HistoryParams {
  from: Date;
  to: Date;
  shopId: number;
  categoryId?: number;
}

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IConsumptionInput;
  query: {
    from?: string;
    to?: string;
    shopId?: string;
    categoryId?: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const user = await getUser(req);
      const consumption = await ConsumptionService.consume(req.body, user.id);
      res.status(201).json(consumption);
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'GET') {
    try {
      const from = req.query.from as string;
      const to = req.query.to as string;
      const shopId = req.query.shopId as string;
      const categoryId = req.query.categoryId;

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

      const config: HistoryParams = {
        shopId: +shopId,
        from: new Date(from),
        to: new Date(to),
      };

      if (categoryId && isNaN(+categoryId)) {
        throw ApiError.badRequest('Неверные параметры запроса!');
      }

      if (categoryId) {
        config.categoryId = +categoryId;
      }

      const history = categoryId
        ? await ConsumptionService.getCatHistory(config)
        : await ConsumptionService.getHistory(config);
      return res.status(200).json(history);
    } catch (error) {
      handleServerError(res, error);
    }
  }
}
