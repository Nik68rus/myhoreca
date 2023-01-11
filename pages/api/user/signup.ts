import { isEmail } from './../../../helpers/validation';
import { IUserRegData } from './../../../types/user';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../models';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IUserRegData;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, name, password, password2 } = req.body;
    const normEmail = email.toLowerCase().trim();
    const normName = name.trim();
    const normPassword = password.trim();
    const normPassword2 = password2.trim();

    if (
      !isEmail(normEmail) ||
      normName.length < 3 ||
      normPassword.length < 5 ||
      normPassword !== normPassword2
    ) {
      return res.status(422).json('Неверные значения!');
    }

    try {
      db.sequelize.authenticate();
      db.sequelize.sync();
      const existingUser = await db.users.findOne({ where: { email } });
      if (existingUser) {
        return res.status(422).json('Данный e-mail уже зарегистрирован!');
      }
      const user = await db.users.create({ email, name, password });
      return user;
    } catch (error) {
      return res.status(500).json('Ошибка на сервере!');
    }
  }
}
