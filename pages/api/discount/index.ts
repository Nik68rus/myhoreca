import { IDiscountRequestBody } from './../../../types/discount';
import { getAdmin, getUser } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import { handleServerError } from '../../../helpers/error';
import DiscountService from '../../../services/DiscountService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IDiscountRequestBody;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { categoryId, value } = req.body;

    try {
      const user = await getAdmin(req);

      const discount = await DiscountService.create({
        spaceId: user.spaceId,
        categoryId,
        value,
      });
      return res.status(201).json(discount);
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'GET') {
    try {
      const user = await getUser(req);
      const discounts = await DiscountService.getAll(user.spaceId);
      return res.status(200).json(discounts);
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
