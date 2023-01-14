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
    const { email } = req.body;
    console.log(email);

    try {
      const user = await UserService.startRecover(email);
      return res.status(200).json(user);
    } catch (err) {
      handleServerError(res, err);
    }
  }

  if (req.method === 'GET') {
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
