import { ICompany } from './../../../models/company';
import { isEmail } from './../../../helpers/validation';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../models';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: ICompany;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { title } = req.body;
    const normTitle = title.trim();

    if (normTitle.length < 3) {
      return res.status(422).json('Слишком короткое название!');
    }

    try {
      db.sequelize.authenticate();
      db.sequelize.sync();
      const existingCompany = await db.companies.findOne({
        where: { title: normTitle },
      });
      if (existingCompany) {
        return res.status(422).json('Данная компания уже зарегистрирована!');
      }
      const company = await db.companies.create({ title: normTitle });
      return res.status(201).json(company);
    } catch (error) {
      console.log(error);

      return res.status(500).json('Ошибка на сервере!');
    }
  }
}
