import ApiError from '../helpers/error';
import db from '../models';

class SpaceService {
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
    return newSpace;
  }
}

export default new SpaceService();
