import { Routes } from './../../../../types/routes';
import { NextApiRequest, NextApiResponse } from 'next';
import UserService from '../../../../services/UserService';
import { handleServerError } from '../../../../helpers/error';
import MailService from '../../../../services/MailService';

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    email: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { email } = req.query;

    try {
      await MailService.sendActivationMail(email);
      res.status(200).json('Письмо отправлено');
    } catch (error) {
      handleServerError(res, error);
    }
  }
}
