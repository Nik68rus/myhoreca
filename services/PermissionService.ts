import { IUser } from './../models/user';
import { UserRole } from './../types/user';
import ApiError from '../helpers/error';
import db from '../models';
import { IPermission } from '../models/permission';

class PermissionService {
  constructor() {
    db.connect();
  }

  async create(userId: number, shopId: number, role: UserRole) {
    const existing = await db.permissions.findOne({
      where: { userId, shopId, role },
    });
    if (existing) {
      throw ApiError.badRequest('Данное разрешение уже зарегистрировано!');
    }

    const permission = await db.permissions.create({ userId, shopId, role });
    return permission;
  }

  async getSpaceShops(spaceId: number) {
    const shops = await db.shops.findAll({
      where: { spaceId },
    });
    db.sequelize.close();
    return shops;
  }

  async getShopCashiers(shopId: number) {
    const permissions = (await db.permissions.findAll({
      where: { shopId, role: UserRole.CASHIER },
      include: db.users,
    })) as unknown as IPermission & { user: IUser }[];
    db.sequelize.close();
    return permissions.map((perm) => perm.user);
  }
}

export default new PermissionService();
