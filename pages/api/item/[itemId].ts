import { getAdmin } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import ItemService from '../../../services/ItemService';
import { IItem } from '../../../models/item';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: Partial<IItem>;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    const { id, title, imageUrl, isCountable, categoryId, isVisible } =
      req.body;

    try {
      const user = await getAdmin(req);
      const item = await ItemService.getById(id!);
      if (!item) throw ApiError.notFound('Товар не найден');
      if (user.spaceId !== item.spaceId)
        throw ApiError.notAuthorized('Недостаточно прав');
      if (title) item.title = title;
      if (imageUrl) item.imageUrl = imageUrl;
      if (isCountable !== undefined) item.isCountable = isCountable;
      if (categoryId) item.categoryId = categoryId;
      if (isVisible !== undefined) item.isVisible = isVisible;
      await item.save();
      return res.status(200).json(item);
    } catch (error) {
      handleServerError(res, error);
    }
  }
}
