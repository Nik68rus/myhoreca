import { Routes } from './../../../../types/routes';
import { IUserLoginData } from './../../../../types/user';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../../helpers/error';
import UserService from '../../../../services/UserService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IUserLoginData;
  query: {
    code?: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // Редирект при переходе по ссылке из письма
    const { code } = req.query;
    return res.redirect(`${Routes.SIGNUP}?code=${code}`);
  }

  if (req.method === 'POST') {
    // Найти пользователя по коду инвайта
    try {
      const { code } = req.query;

      if (!code) {
        throw ApiError.badRequest('Не указан код инвайта');
      }

      const data = await UserService.findByCode(code);
      return res.status(200).json(data);
    } catch (error) {
      handleServerError(res, error);
    }
  }
}
