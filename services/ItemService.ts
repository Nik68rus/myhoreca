import { IItemInput } from './../types/item';
import ApiError from '../helpers/error';
import db from '../models';

class ItemService {
  constructor() {
    db.connect();
  }

  async create(item: IItemInput & { spaceId: number }) {
    db.sequelize.sync();
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
    db.sequelize.close();
    return newItem;
  }

  async getItems(spaceId: number) {
    db.sequelize.sync();
    const items = await db.items.findAll({
      where: { spaceId },
      include: [{ model: db.categories, attributes: ['title'] }],
    });
    return items;
  }

  async getById(itemId: number) {
    const item = await db.items.findByPk(itemId);
    return item;
  }
}

export default new ItemService();
