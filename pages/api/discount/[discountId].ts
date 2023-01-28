import { IDiscountRequestBody } from './../../../types/discount';
import { getAdmin, getUser } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import DiscountService from '../../../services/DiscountService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: { value: number };
  query: { discountId: string };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const { discountId } = req.query;

  if (isNaN(+discountId)) {
    throw ApiError.badRequest('Неверный ID скидки!');
  }

  if (req.method === 'PATCH') {
    const { value } = req.body;

    try {
      const user = await getAdmin(req);

      const discount = await DiscountService.update(+discountId, value);
      return res.status(200).json(discount);
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'DELETE') {
    try {
      const user = await getAdmin(req);
      await DiscountService.delete(+discountId);
      return res.status(200).json('Скидка удалена!');
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
