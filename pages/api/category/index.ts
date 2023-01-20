import { validateToken } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import db from '../../../models';
import { UserRole } from '../../../types/user';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    title: string;
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
    const { title } = req.body;

    const token = req.cookies.accessToken;

    if (!token) {
      throw ApiError.notAuthenticated('Пользователь не авторизован!');
    }
    try {
      let user;
      try {
        user = await validateToken(token, process.env.JWT_ACCESS_SECRET);
      } catch (err) {
        throw ApiError.notAuthenticated('Токен не валидный!');
      }

      if (user.role !== UserRole.OWNER) {
        throw ApiError.notAuthorized('Недостаточно прав!');
      }

      const existingCat = await db.categories.findOne({
        where: { spaceId: user.spaceId, title: title.trim() },
      });

      if (existingCat) {
        throw ApiError.badRequest('Данная категория уже существует!');
      }

      const cat = await db.categories.create({
        title: title.trim(),
        spaceId: user.spaceId,
      });

      return res.status(201).json(cat);
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'GET') {
    const token = req.cookies.accessToken;

    if (!token) {
      throw ApiError.notAuthenticated('Пользователь не авторизован');
    }
    try {
      let user;
      try {
        user = await validateToken(token, process.env.JWT_ACCESS_SECRET);
      } catch (err) {
        throw ApiError.notAuthenticated('Токен не валидный!');
      }
      const categories = await db.categories.findAll({
        where: { spaceId: user.spaceId },
      });
      return res.status(200).json(categories);
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
