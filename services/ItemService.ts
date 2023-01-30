import { IItemInput } from './../types/item';
import ApiError from '../helpers/error';
import db from '../models';

class ItemService {
  async create(item: IItemInput & { spaceId: number; isVisible: boolean }) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const normTitle = item.title.trim();

    if (normTitle.length < 3) {
      throw ApiError.validation('Слишком короткое название!');
    }

    const existingItem = await db.items.findOne({
      where: { title: normTitle, spaceId: item.spaceId },
    });

    if (existingItem) {
      throw ApiError.badRequest('Данный товар уже зарегистрирован!');
    }

    const newItem = await db.items.create({ ...item, title: normTitle });
    return newItem;
  }

  async getItems(spaceId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    // await db.items.sync({ force: true });
    const items = await db.items.findAll({
      where: { spaceId },
      order: [['title', 'ASC']],
    });
    return items;
  }

  async getById(itemId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const item = await db.items.findByPk(itemId);
    return item;
  }
}

export default new ItemService();
