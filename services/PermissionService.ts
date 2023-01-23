import { IShop } from './../models/shop';
import { IUser } from './../models/user';
import { UserRole } from './../types/user';
import ApiError from '../helpers/error';
import db from '../models';
import { IPermission } from '../models/permission';

class PermissionService {
  async create(userId: number, shopId: number, role: UserRole) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

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
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const shops = await db.shops.findAll({
      where: { spaceId },
    });
    return shops;
  }

  async getShopCashiers(shopId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const permissions = (await db.permissions.findAll({
      where: { shopId, role: UserRole.CASHIER },
      include: db.users,
    })) as unknown as IPermission & { user: IUser }[];
    return permissions.map((perm) => perm.user);
  }

  async getCashierShops(userId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const permissions = (await db.permissions.findAll({
      where: { userId, role: UserRole.CASHIER },
      include: db.shops,
    })) as unknown as IPermission & { shop: IShop }[];
    return permissions.map((perm) => perm.shop);
  }
}

export default new PermissionService();
