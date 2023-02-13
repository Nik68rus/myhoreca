import { ICategory } from './../models/category';
import { IShopItem } from './../models/shopItem';
import { TokenPayload } from './../types/user';
import { UserRole } from '../types/user';
import ApiError from '../helpers/error';
import db from '../models';
import PermissionService from './PermissionService';
import { IItem } from '../models/item';

export interface IMenuItem {
  id: number;
  category: string;
  categoryId: number;
  title: string;
  price: number;
  quantity: number;
}

interface IItemWithCategory extends IItem {
  category: ICategory;
}
interface IDetailedShopItem extends IShopItem {
  item: IItemWithCategory;
}

class ShopService {
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
    return shop;
  }

  async getShops(spaceId?: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const shops = spaceId
      ? await db.shops.findAll({ where: { spaceId } })
      : await db.shops.findAll();
    return shops;
  }

  async getById(id: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const shop = await db.shops.findByPk(id);
    return shop;
  }

  async getMenu(shopId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const items = (await db.shopItems.findAll({
      where: { shopId },
      include: [{ model: db.items, include: [db.categories] }],
    })) as IDetailedShopItem[];

    const mappedItems: IMenuItem[] = items.map((shopItem) => ({
      id: shopItem.id,
      category: shopItem.item.category.title,
      categoryId: shopItem.item.categoryId,
      title: shopItem.item.title,
      price: shopItem.price,
      quantity: shopItem.quantity,
    }));

    return mappedItems;
  }
}

export default new ShopService();
