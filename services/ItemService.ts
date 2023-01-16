import { IItemInput } from './../types/item';
import ApiError from '../helpers/error';
import db from '../models';

class ItemService {
  constructor() {
    db.connect();
  }

  async create(item: IItemInput & { userId: number }) {
    db.sequelize.sync();
    const normTitle = item.title.trim();

    if (normTitle.length < 3) {
      throw ApiError.validation('Слишком короткое название!');
    }

    const existingItem = await db.items.findOne({
      where: { title: normTitle },
    });

    if (existingItem) {
      throw ApiError.badRequest('Данная компания уже зарегистрирована!');
    }

    const newItem = await db.items.create({ ...item, title: normTitle });
    db.sequelize.close();
    return newItem;
  }

  async getItems(userId: number) {
    const items = await db.items.findAll({ where: { userId } });
    return items;
  }
}

export default new ItemService();
