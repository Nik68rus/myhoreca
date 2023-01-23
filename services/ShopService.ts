import { UserRole } from '../types/user';
import ApiError from '../helpers/error';
import db from '../models';
import PermissionService from './PermissionService';

class ShopService {
  // constructor() {
  //   db.connect();
  // }

  async create(title: string, spaceId: number, userId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const normTitle = title.trim();

    if (normTitle.length < 3) {
      throw ApiError.validation('Слишком короткое название!');
    }

    const existingShop = await db.shops.findOne({
      where: { title: normTitle, spaceId },
    });

    if (existingShop) {
      throw ApiError.badRequest('Данная точка продаж уже зарегистрирована!');
    }

    const shop = await db.shops.create({ title: normTitle, spaceId });
    await PermissionService.create(userId, shop.id, UserRole.OWNER);
    // db.sequelize.close();
    return shop;
  }

  async getShops(spaceId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const shops = await db.shops.findAll({ where: { spaceId } });
    return shops;
  }

  async getById(id: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const shop = await db.shops.findByPk(id);
    return shop;
  }
}

export default new ShopService();
