import { IWriteOff } from './../../../types/item';
import { getAdmin, getUser } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import db from '../../../models';
import ConsumptionService from '../../../services/ConsumptionService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IWriteOff;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { shopId, itemId, quantity, comment } = req.body;
    try {
      const user = await getUser(req);
      const consumption = await ConsumptionService.writeOff({
        userId: user.id,
        shopId,
        itemId,
        quantity,
        comment,
      });
      res.status(201).json(consumption);
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'GET') {
  }
}
