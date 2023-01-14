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
      return res.status(201).json(company.title);
    } catch (error) {
      handleServerError(res, error);
    }
  }
}
