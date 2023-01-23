import { getAdmin, getUser } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import db from '../../../models';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    title: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { title } = req.body;

    try {
      await db.sequelize.authenticate();
      await db.sequelize.sync();

      const user = await getAdmin(req);

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
    try {
      await db.sequelize.authenticate();
      await db.sequelize.sync();

      const user = await getUser(req);
      const categories = await db.categories.findAll({
        where: { spaceId: user.spaceId },
      });
      return res.status(200).json(categories);
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
