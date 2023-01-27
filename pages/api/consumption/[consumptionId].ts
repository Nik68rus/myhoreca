import { IConsumptionInput } from './../../../types/item';
import { getAdmin, getUser } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import db from '../../../models';
import ConsumptionService from '../../../services/ConsumptionService';
import { isIsoDate } from '../../../helpers/validation';

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    consumptionId: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const consumptionId = req.query.consumptionId as string;
      const user = await getUser(req);
      const reciept = await ConsumptionService.getReciept(+consumptionId);
      res.status(200).json(reciept);
    } catch (error) {
      handleServerError(res, error);
    }
  }
}
