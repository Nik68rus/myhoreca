import { IConsumptionInput } from './../../../types/item';
import { getAdmin, getUser } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import db from '../../../models';
import ConsumptionService from '../../../services/ConsumptionService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IConsumptionInput;
  query: {
    date?: string;
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

      if (!date) {
        throw ApiError.badRequest('Не указана дата!');
      }

      const user = await getUser(req);
      const history = ConsumptionService.getHistory(user.id, date);
    } catch (error) {
      handleServerError(res, error);
    }
  }
}
