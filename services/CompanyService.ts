import { UserRole } from './../types/user';
import ApiError from '../helpers/error';
import db from '../models';
import PermissionService from './PermissionService';

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
    await PermissionService.create(owner, company.id, UserRole.OWNER);
    db.sequelize.close();
    return company;
  }
}

export default new CompanyService();
