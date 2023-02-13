import ApiError from '../helpers/error';
import db from '../models';
import ShopService from './ShopService';

class GroupService {
  async create(data: { title: string; categoryId: number }, spaceId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const title = data.title.trim();

    if (title.length < 3) {
      throw ApiError.validation('Слишком короткое название!');
    }

    const existingGroup = await db.groups.findOne({
      where: { spaceId, categoryId: data.categoryId, title },
    });

    if (existingGroup) {
      throw ApiError.badRequest('Такая группа уже существует!');
    }

    const group = await db.groups.create({
      spaceId,
      categoryId: data.categoryId,
      title,
    });

    return group;
  }

  async getAll(spaceId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const groups = await db.groups.findAll({
      where: { spaceId },
      order: [['title', 'asc']],
      include: { model: db.categories, attributes: ['title'] },
    });

    return groups;
  }

  async update(groupId: number, data: { title: string; categoryId: number }) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    if (data.title.trim().length < 3) {
      throw ApiError.validation('Некорректное название!');
    }

    const group = await db.groups.findByPk(groupId);
    if (group) {
      group.title = data.title;
      group.categoryId = data.categoryId;
      return await group.save();
    }

    throw ApiError.notFound('Такой группы не существует!');
  }

  async delete(groupId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const group = await db.groups.findByPk(groupId);
    if (group) {
      return await group.destroy();
    }

    throw ApiError.notFound('Такой группы не существует!');
  }

  async getShopGroups(shopId: number) {
    const shop = await ShopService.getById(shopId);
    if (!shop) {
      throw ApiError.notFound('Точка не найдена!');
    }
    const groups = await this.getAll(shop.spaceId);
    return groups;
  }
}

export default new GroupService();
