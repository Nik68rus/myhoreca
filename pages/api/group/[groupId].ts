import { getAdmin, getUser } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import GroupService from '../../../services/GroupService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: { title: string; categoryId: number };
  query: { groupId: string };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const { groupId } = req.query;

  if (isNaN(+groupId)) {
    throw ApiError.badRequest('Неверный ID группы!');
  }

  if (req.method === 'PATCH') {
    try {
      const user = await getAdmin(req);

      const group = await GroupService.update(+groupId, req.body);
      return res.status(200).json(group);
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'DELETE') {
    try {
      const user = await getAdmin(req);
      await GroupService.delete(+groupId);
      return res.status(200).json('Группа удалена!');
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
