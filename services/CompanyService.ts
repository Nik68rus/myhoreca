import { ICompany } from './../models/company';
import { IPermission } from './../models/permission';
import { UserRole } from './../types/user';
import { v4 as uuidv4 } from 'uuid';
import ApiError from '../helpers/error';
import db from '../models';
import MailService from './MailService';
import { generateToken, validateToken } from '../helpers/token';

class CompanyService {
  constructor() {
    db.connect();
  }

  async create(title: string, owner: number) {
    const normTitle = title.trim();

    if (normTitle.length < 3) {
      throw ApiError.validation('Слишком короткое название!');
    }

    const existingCompany = await db.companies.findOne({
      where: { title: normTitle },
    });

    if (existingCompany) {
      throw ApiError.badRequest('Данная компания уже зарегистрирована!');
    }

    const company = await db.companies.create({ title: normTitle });
    await db.permissions.create({
      companyId: company.id,
      userId: owner,
      role: UserRole.OWNER,
    });
    db.sequelize.close();
    return company;
  }

  async getList(ownerId: number) {
    const companies = (await db.permissions.findAll({
      where: { userId: ownerId, role: UserRole.OWNER },
      include: db.companies,
    })) as unknown as IPermission & { company: ICompany }[];
    db.sequelize.close();
    return companies.map((com) => com.company);
  }
}

export default new CompanyService();
