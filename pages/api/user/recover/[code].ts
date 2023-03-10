import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../../helpers/error';
import UserService from '../../../../services/UserService';
import { Routes } from '../../../../types/routes';

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    code: string;
  };
  body: {
    password?: string;
    password2?: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;

  if (req.method === 'GET') {
    //переадресация на ссылку для валидации кода сброса
    return res.redirect(`${Routes.PASSWORD}?code=${code}`);
  }

  if (req.method === 'POST') {
    //установка нового пароля
    const { password, password2 } = req.body;
    try {
      if (!password || !password2) {
        throw ApiError.badRequest('Предоставлены не все данные');
      }
      if (password.trim() !== password2.trim()) {
        throw ApiError.validation('Пароли не совпадают');
      }
      const user = await UserService.finishRecover(code, password);
      return res.status(200).json(user.email);
    } catch (error) {
      handleServerError(res, error);
    }
  }
}
