import { getAdmin, getUser } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import { handleServerError } from '../../../helpers/error';
import GroupService from '../../../services/GroupService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: { title: string; categoryId: number };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const user = await getAdmin(req);

      const group = await GroupService.create(req.body, user.spaceId);
      return res.status(201).json(group);
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'GET') {
    try {
      const user = await getUser(req);
      const groups = await GroupService.getAll(user.spaceId);
      return res.status(200).json(groups);
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
