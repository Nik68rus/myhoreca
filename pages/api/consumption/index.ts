import { IConsumptionInput } from './../../../types/item';
import { getAdmin, getUser } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import db from '../../../models';
import ConsumptionService from '../../../services/ConsumptionService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IConsumptionInput;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { shopId, isSale, byCard, isDiscount, items, total } = req.body;
    try {
      const user = await getUser(req);
      const consumption = await ConsumptionService.sale(req.body, user.id);
      res.status(201).json(consumption);
    } catch (error) {
      handleServerError(error);
    }
  }

  if (req.method === 'GET') {
  }
}
