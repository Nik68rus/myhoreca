import { NextApiRequest, NextApiResponse } from 'next';
import { handleServerError } from '../../../../helpers/error';
import UserService from '../../../../services/UserService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    email: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    //Начать восстановление пароля и отправить письмо
    const { email } = req.body;

    try {
      const user = await UserService.startRecover(email);
      return res.status(200).json(user);
    } catch (err) {
      handleServerError(res, err);
    }
  }

  if (req.method === 'GET') {
    //проверить код восстановления после перехода по ссылке из письма
    const code = req.query.code as string;
    if (code) {
      try {
        const result = await UserService.validateRecovery(code);
        return res.status(200).json(result);
      } catch (error) {
        handleServerError(res, error);
      }
    }
  }
}
