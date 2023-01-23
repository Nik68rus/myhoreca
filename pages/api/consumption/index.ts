import { IConsumptionInput } from './../../../types/item';
import { getAdmin, getUser } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import db from '../../../models';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IConsumptionInput;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
  }

  if (req.method === 'GET') {
  }
}
