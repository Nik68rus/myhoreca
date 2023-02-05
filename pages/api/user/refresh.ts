import { getUser } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import TokenService from '../../../services/TokenService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const token = req.cookies.refreshToken;
      const user = await getUser(req);
      if (user && token) {
        const result = await TokenService.deleteToken(user.id, token);
        return res.status(200).json(result);
      }
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'GET') {
    try {
      const { refreshToken } = req.cookies;

      if (refreshToken) {
        const authData = await TokenService.refresh(refreshToken);
        return res.status(200).json(authData);
      }

      throw ApiError.notAuthenticated('Пользователь не авторизован!');
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
