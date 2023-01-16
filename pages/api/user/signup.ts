import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UserRole } from './../../../types/user';
import { isEmail } from '../../../helpers/validation';
import { IUserRegData } from '../../../types/user';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../models';
import UserService from '../../../services/UserService';
import ApiError, { handleServerError } from '../../../helpers/error';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IUserRegData;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Регистрация владельца
    const { email, name, password, password2, role } = req.body;
    const normEmail = email.toLowerCase().trim();
    const normName = name.trim();
    const normPassword = password.trim();
    const normPassword2 = password2.trim();

    try {
      if (
        !isEmail(normEmail) ||
        normName.length < 3 ||
        normPassword.length < 5 ||
        normPassword !== normPassword2
      ) {
        throw ApiError.validation('Недопустимые значения!');
      }

      const user = await UserService.create(email, password, name, role);
      return res.status(201).json(user);
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'PATCH') {
    // Активация кассира по инвайту
    const { email, name, password, password2, role } = req.body;

    const normName = name.trim();
    const normPassword = password.trim();
    const normPassword2 = password2.trim();

    try {
      if (
        normName.length < 3 ||
        normPassword.length < 5 ||
        normPassword !== normPassword2
      ) {
        throw ApiError.validation('Недопустимые значения!');
      }
      const userData = {
        email,
        name,
        password,
        isActivated: true,
      };
      const user = await UserService.update(userData);
      return res.status(200).json(user);
    } catch (error) {
      handleServerError(res, error);
    }
  }
}
