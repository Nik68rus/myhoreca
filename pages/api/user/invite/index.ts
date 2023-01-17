import { ICompany } from '../../../../models/company';
import { validateToken } from '../../../../helpers/token';
import { IUserLoginData, UserRole } from '../../../../types/user';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import db from '../../../../models';
import UserService from '../../../../services/UserService';
import ApiError, { handleServerError } from '../../../../helpers/error';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    email: string;
    company: ICompany;
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
    console.log(req.body);

    const { email, company } = req.body;
    const token = req.cookies.accessToken;

    if (!token) {
      throw ApiError.notAuthenticated('Пользователь не авторизован!');
    }

    try {
      const user = await validateToken(token, process.env.JWT_ACCESS_SECRET);

      if (user.role !== UserRole.OWNER) {
        throw ApiError.notAuthorized('Не достаточно прав доступа!');
      }

      const from = `${user.name} (${user.email})`;

      const employee = await UserService.invite(email, from, company);

      return res.status(201).json(employee);
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'GET') {
    // Accept invite
  }
}
