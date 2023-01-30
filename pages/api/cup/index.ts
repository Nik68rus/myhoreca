import { getAdmin, getUser } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import { handleServerError } from '../../../helpers/error';
import CupService from '../../../services/CupService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: { title: string };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { title } = req.body;

    try {
      const user = await getAdmin(req);

      const cup = await CupService.create(title, user.spaceId);
      return res.status(201).json(cup);
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'GET') {
    try {
      const user = await getUser(req);
      const cups = await CupService.getAll(user.spaceId);
      return res.status(200).json(cups);
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
