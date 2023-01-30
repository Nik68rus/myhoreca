import { getAdmin, getUser } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import CupService from '../../../services/CupService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: { title: string };
  query: { cupId: string };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const { cupId } = req.query;

  if (isNaN(+cupId)) {
    throw ApiError.badRequest('Неверный ID тары!');
  }

  if (req.method === 'PATCH') {
    const { title } = req.body;

    try {
      const user = await getAdmin(req);

      const cup = await CupService.update(+cupId, title);
      return res.status(200).json(cup);
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'DELETE') {
    try {
      const user = await getAdmin(req);
      await CupService.delete(+cupId);
      return res.status(200).json('Тара удалена!');
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
