import { validateToken } from '../../../helpers/token';
import { Routes } from '../../../types/routes';
import { NextApiRequest, NextApiResponse } from 'next';
import UserService from '../../../services/UserService';
import ApiError, { handleServerError } from '../../../helpers/error';
import MailService from '../../../services/MailService';

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    email?: string;
    code?: string;
  };
  cookies: {
    accessToken?: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // активация по переходу по ссылке из письма
    const { code } = req.query;

    try {
      if (!code) throw ApiError.badRequest('Не указан код активации!');
      const user = await UserService.activate(code);
      if (user) {
        return res.redirect(
          `${Routes.LOGIN}?user=${user.email}&activation=true`
        );
      }
      return ApiError.notFound('Пользователь не найден');
    } catch (error) {
      handleServerError(res, error);
    }
  }
  if (req.method === 'POST') {
    //повторная отпрака кода активации по требованию пользователя
    const { accessToken } = req.cookies;
    try {
      if (accessToken) {
        const user = await validateToken(
          accessToken,
          process.env.JWT_ACCESS_SECRET
        );
        await MailService.sendActivationMail(user.email);
        res.status(200).json('Письмо отправлено');
      }
    } catch (error) {
      handleServerError(res, error);
    }
  }
}
