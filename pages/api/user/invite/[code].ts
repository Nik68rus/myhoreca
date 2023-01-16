import { ICompany } from '../../../../models/company';
import { validateToken } from '../../../../helpers/token';
import { IUserLoginData, UserRole } from '../../../../types/user';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import db from '../../../../models';
import UserService from '../../../../services/UserService';
import ApiError, { handleServerError } from '../../../../helpers/error';
import { Routes } from '../../../../types/routes';

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    code: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // Accept invite
    const { code } = req.query;
    return res.redirect(`${Routes.SIGNUP}?code=${code}`);
  }
}
