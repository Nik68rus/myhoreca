import { validateToken } from './../../../helpers/token';
import { IUserLoginData, UserRole } from '../../../types/user';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import db from '../../../models';
import UserService from '../../../services/UserService';
import ApiError, { handleServerError } from '../../../helpers/error';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
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
    // Invite employee
    const { email } = req.body;
    const token = req.cookies.accessToken;

    if (!token) {
      throw ApiError.notAuthenticated('Пользователь не авторизован!');
    }

    try {
      const user = await validateToken(token, process.env.JWT_ACCESS_SECRET);

      if (user.role !== UserRole.OWNER) {
        throw ApiError.notAuthorized('Не достаточно прав доступа!');
      }

      console.log(email);

      return res.status(201).json('Скоро тут будем создавать инвайты');
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'GET') {
    // Accept invite
  }
}
