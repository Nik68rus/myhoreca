import { validateToken } from './../../../helpers/token';
import { IUserLoginData, UserRole } from '../../../types/user';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import db from '../../../models';
import UserService from '../../../services/UserService';
import ApiError, { handleServerError } from '../../../helpers/error';
import PermissionService from '../../../services/PermissionService';

interface ExtendedNextApiRequest extends NextApiRequest {
  cookies: {
    accessToken?: string;
  };
  query: {
    companyId: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // Get list of company cashiers
    const { companyId } = req.query;

    try {
      const token = req.cookies.accessToken;

      if (!token) {
        throw ApiError.notAuthenticated('Пользователь не авторизован');
      }

      const userData = await validateToken(
        token,
        process.env.JWT_ACCESS_SECRET
      );

      if (userData.role !== UserRole.OWNER) {
        throw ApiError.notAuthorized('Недостаточно прав!');
      }

      const users = await PermissionService.getCompanyCashiers(+companyId);
      return res.status(200).json(users);
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
