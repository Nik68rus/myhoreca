import { getAdmin, getUser } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import SalaryService from '../../../services/SalaryService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    shopId: number;
    amount: number;
  };
  query: {
    shopId?: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { shopId, amount } = req.body;

    try {
      await getAdmin(req);
      const salary = SalaryService.createOrEdit(shopId, amount);
      return res.status(201).json(salary);
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'GET') {
    try {
      const { shopId } = req.query;
      if (!shopId || isNaN(+shopId)) {
        throw ApiError.validation('Неверно указан id точки');
      }
      const user = await getUser(req);
      const salary = await SalaryService.get(+shopId);
      return res.status(200).json(salary);
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
