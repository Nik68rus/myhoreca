import { isEmail } from '../../../helpers/validation';
import { IUserRegData } from '../../../types/user';
import { NextApiRequest, NextApiResponse } from 'next';
import UserService from '../../../services/UserService';
import ApiError, { handleServerError } from '../../../helpers/error';
import SpaceService from '../../../services/SpaceService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IUserRegData;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Регистрация пользователя
    const { email, name, password, password2, role, space } = req.body;
    const normEmail = email.toLowerCase().trim();
    const normSpace = space.trim();
    const normName = name.trim();
    const normPassword = password.trim();
    const normPassword2 = password2.trim();

    try {
      if (
        !isEmail(normEmail) ||
        normName.length < 3 ||
        normSpace.length < 3 ||
        normPassword.length < 5 ||
        normPassword !== normPassword2
      ) {
        throw ApiError.validation('Недопустимые значения!');
      }
      const space = await SpaceService.create(normSpace);
      const user = await UserService.create({
        email,
        password,
        name,
        role,
        spaceId: space.id,
      });
      return res.status(201).json(user);
    } catch (error) {
      handleServerError(res, error);
    }
  }
}
