import { IItemInput } from './../../../types/item';
import { getUser } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import { handleServerError } from '../../../helpers/error';
import ItemService from '../../../services/ItemService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IItemInput;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { title, imageUrl, isCountable, categoryId } = req.body;

    try {
      const user = await getUser(req);
      const item = await ItemService.create({
        spaceId: user.spaceId,
        categoryId,
        title,
        imageUrl,
        isCountable,
      });
      return res.status(201).json(item);
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'GET') {
    try {
      const user = await getUser(req);
      const items = await ItemService.getItems(user.spaceId);
      return res.status(200).json(items);
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
