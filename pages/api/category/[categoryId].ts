import { ICategory } from './../../../models/category';
import { validateToken } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import db from '../../../models';
import { UserRole } from '../../../types/user';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: Partial<ICategory>;
  cookies: {
    accessToken?: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    const { id, title } = req.body;

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

      const cat = await db.categories.findOne({
        where: { spaceId: user.spaceId, id },
      });

      if (!cat) {
        throw ApiError.notFound('Категория не найдена!');
      }

      if (title) {
        cat.title = title;
      }

      await cat.save();

      return res.status(200).json(cat);
    } catch (error) {
      handleServerError(res, error);
    }
  }
}
