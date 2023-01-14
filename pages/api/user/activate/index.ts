import { validateToken } from './../../../../helpers/token';
import { Routes } from './../../../../types/routes';
import { NextApiRequest, NextApiResponse } from 'next';
import UserService from '../../../../services/UserService';
import { handleServerError } from '../../../../helpers/error';
import MailService from '../../../../services/MailService';

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    email: string;
  };
  cookies: {
    accessToken?: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
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
