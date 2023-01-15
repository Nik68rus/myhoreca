import { validateToken } from './../../../helpers/token';
import { ICompany } from './../../../models/company';
import { isEmail } from './../../../helpers/validation';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../models';
import ApiError, { handleServerError } from '../../../helpers/error';
import CompanyService from '../../../services/CompanyService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: ICompany;
  cookies: {
    accessToken?: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { title } = req.body;

    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json('Пользователь не авторизован!');
    }

    try {
      const user = await validateToken(token, process.env.JWT_ACCESS_SECRET);
      const company = await CompanyService.create(title, user.id);
      return res.status(201).json(company);
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'GET') {
    try {
      const ownerId = req.query.ownerId as string;

      if (!ownerId) {
        throw ApiError.badRequest('Не указан id пользователя');
      }

      const token = req.cookies.accessToken;

      if (!token) {
        throw ApiError.notAuthenticated('Пользователь не авторизован!');
      }

      const user = await validateToken(token, process.env.JWT_ACCESS_SECRET);

      if (user.id !== +ownerId) {
        throw ApiError.notAuthorized('Нет доступа!');
      }

      const companies = await CompanyService.getList(+ownerId);
      return res.status(200).json(companies);
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
