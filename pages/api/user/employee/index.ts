import { getAdmin } from './../../../../helpers/token';
import { IShop } from '../../../../models/shop';
import { NextApiRequest, NextApiResponse } from 'next';
import UserService from '../../../../services/UserService';
import ApiError, { handleServerError } from '../../../../helpers/error';
import PermissionService from '../../../../services/PermissionService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    email: string;
    shop: IShop;
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
    // Invite employee
    const { email, shop } = req.body;

    try {
      const user = await getAdmin(req);
      const from = `${user.name} (${user.email})`;
      const employee = await UserService.invite(email, from, shop);
      return res.status(201).json(employee);
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'GET') {
    // Get list of company cashiers
    try {
      const { shopId } = req.query;
      if (!shopId) {
        throw ApiError.badRequest('Не указан id точки продаж');
      }

      await getAdmin(req);

      const users = await PermissionService.getShopCashiers(+shopId);
      return res.status(200).json(users);
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
