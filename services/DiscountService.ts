import { IDiscountInput, IDiscountWithCategory } from './../types/discount';
import ApiError from '../helpers/error';
import db from '../models';

class DiscountService {
  async create(item: IDiscountInput) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const { categoryId, spaceId, value } = item;

    const existingDiscount = await db.discounts.findOne({
      where: { spaceId, categoryId },
    });

    if (existingDiscount) {
      throw ApiError.badRequest('Скидка для этой категории уже существует!');
    }

    if (value <= 0) {
      throw ApiError.badRequest('Значение скидки должно быть больше 0');
    }

    const discount = await db.discounts.create({
      spaceId,
      categoryId,
      value,
    });

    return discount;
  }

  async getAll(spaceId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const discounts = await db.discounts.findAll({
      where: { spaceId },
      include: db.categories,
    });

    return discounts;
  }

  async update(discountId: number, value: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    if (value < 1) {
      throw ApiError.validation('Некорректное значение скидки!');
    }

    const discount = await db.discounts.findByPk(discountId);
    if (discount) {
      discount.value = value;
      return await discount.save();
    }

    throw ApiError.notFound('Данная скидка не существует!');
  }

  async delete(discountId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const discount = await db.discounts.findByPk(discountId);
    if (discount) {
      return await discount.destroy();
    }

    throw ApiError.notFound('Данная скидка не существует!');
  }
}

export default new DiscountService();
