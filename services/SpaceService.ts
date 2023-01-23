import { IItemInput } from './../types/item';
import ApiError from '../helpers/error';
import db from '../models';

class SpaceService {
  // constructor() {
  //   db.connect();
  // }

  async create(title: string) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const normTitle = title.trim();

    if (normTitle.length < 3) {
      throw ApiError.validation('Слишком короткое название!');
    }

    const existingSpace = await db.spaces.findOne({
      where: { title: normTitle },
    });

    if (existingSpace) {
      throw ApiError.badRequest('Данная компания уже зарегистрирована!');
    }

    const newSpace = await db.spaces.create({ title: normTitle });
    // db.sequelize.close();
    return newSpace;
  }
}

export default new SpaceService();
