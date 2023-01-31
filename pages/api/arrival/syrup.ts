import { getUser } from '../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import ItemService from '../../../services/ItemService';

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    shopId: string;
  };
}
export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { shopId } = req.query;

      if (!shopId || isNaN(+shopId)) {
        throw ApiError.badRequest(
          'Отсутствует или неверный id торговой точки!'
        );
      }
      const user = await getUser(req);
      const syrup = await ItemService.getSyrup(user.spaceId, +shopId);
      return res.status(200).json(syrup);
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
