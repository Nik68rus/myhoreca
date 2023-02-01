import ApiError from '../helpers/error';
import db from '../models';

class CupService {
  async create(titleInput: string, spaceId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const title = titleInput.trim();

    if (title.length < 3) {
      throw ApiError.validation('Слишком короткое название!');
    }

    const existingCup = await db.cups.findOne({
      where: { spaceId, title },
    });

    if (existingCup) {
      throw ApiError.badRequest('Такая тара уже существует!');
    }

    const cup = await db.cups.create({
      spaceId,
      title,
    });

    return cup;
  }

  async getAll(spaceId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const cups = await db.cups.findAll({
      where: { spaceId },
      order: [['title', 'asc']],
    });

    return cups;
  }

  async update(cupId: number, title: string) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    if (title.trim().length < 3) {
      throw ApiError.validation('Некорректное название!');
    }

    const cup = await db.cups.findByPk(cupId);
    if (cup) {
      cup.title = title;
      return await cup.save();
    }

    throw ApiError.notFound('Такой тары не существует!');
  }

  async delete(cupId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const cup = await db.cups.findByPk(cupId);
    if (cup) {
      return await cup.destroy();
    }

    throw ApiError.notFound('Такой тары не существует!');
  }
}

export default new CupService();
