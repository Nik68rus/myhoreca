import { ICategory } from './../../../models/category';
import { getAdmin } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import db from '../../../models';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: Partial<ICategory>;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    const { id, title } = req.body;

    try {
      await db.sequelize.authenticate();
      await db.sequelize.sync();

      const user = await getAdmin(req);
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
