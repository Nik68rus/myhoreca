import { IUser } from './../models/user';
import { ICompany } from './../models/company';
import { UserRole } from './../types/user';
import ApiError from '../helpers/error';
import db from '../models';
import { IPermission } from '../models/permission';

class PermissionService {
  constructor() {
    db.connect();
  }

  async create(userId: number, companyId: number, role: UserRole) {
    const existing = await db.permissions.findOne({
      where: { userId, companyId, role },
    });
    if (existing) {
      throw ApiError.badRequest('Данное разрешение уже зарегистрировано!');
    }

    const permission = await db.permissions.create({ userId, companyId, role });
    return permission;
  }

  async getUserCompanies(userId: number) {
    const permissions = (await db.permissions.findAll({
      where: { userId, role: UserRole.OWNER },
      include: db.companies,
    })) as unknown as IPermission & { company: ICompany }[];
    db.sequelize.close();
    return permissions.map((perm) => perm.company);
  }

  async getCompanyCashiers(companyId: number) {
    const permissions = (await db.permissions.findAll({
      where: { companyId, role: UserRole.CASHIER },
      include: db.users,
    })) as unknown as IPermission & { user: IUser }[];
    db.sequelize.close();
    return permissions.map((perm) => perm.user);
  }
}

export default new PermissionService();
