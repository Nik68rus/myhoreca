import { IConsumptionInput } from './../../../types/item';
import { getAdmin, getUser } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import db from '../../../models';
import ConsumptionService from '../../../services/ConsumptionService';
import { isIsoDate } from '../../../helpers/validation';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IConsumptionInput;
  query: {
    date?: string;
    shopId?: string;
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
      const date = req.query.date as string;
      const shopId = req.query.shopId as string;

      if (!date || !shopId || isNaN(+shopId) || !isIsoDate(date)) {
        throw ApiError.badRequest('Неверные параметры запроса!');
      }

      const user = await getUser(req);
      const history = await ConsumptionService.getHistory({
        userId: user.id,
        shopId: +shopId,
        date: new Date(date),
      });
      return res.status(200).json(history);
    } catch (error) {
      handleServerError(res, error);
    }
  }
}
