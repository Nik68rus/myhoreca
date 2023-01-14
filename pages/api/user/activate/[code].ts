import { Routes } from './../../../../types/routes';
import { NextApiRequest, NextApiResponse } from 'next';
import UserService from '../../../../services/UserService';
import { handleServerError } from '../../../../helpers/error';

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    code: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { code } = req.query;

    try {
      const user = await UserService.activate(code);
      if (user) {
        return res.redirect(
          `${Routes.LOGIN}?activated=true&user=${user.email}`
        );
      }
      return res.status(404).json('Пользователь не найден');
    } catch (error) {
      handleServerError(res, error);
    }
  }
}
