import { IConsumptionInput, IConsumptionWithItem } from './../types/item';
import ApiError from '../helpers/error';
import db from '../models';
import { Op } from 'sequelize';

class ConsumptionService {
  async consume(saleInfo: IConsumptionInput, userId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    // await db.consumptionItems.sync({ force: true });
    const { shopId, isSale, byCard, isDiscount, items, total, comment } =
      saleInfo;
    if (
      [isSale, byCard, isDiscount, total].some((param) => param === undefined)
    ) {
      throw ApiError.badRequest('Не полные данные!');
    }
    try {
      const sale = await db.consumptions.create({
        userId,
        shopId,
        isSale,
        byCard,
        isDiscount,
        total,
        comment,
      });

      items.forEach(async (item) => {
        await db.consumptionItems.create({
          consumptionId: sale.id,
          itemId: item.itemId,
          quantity: item.quantity,
          price: item.price,
          toGo: item.toGo!,
        });

        const stockItem = await db.shopItems.findOne({
          where: { itemId: item.itemId },
        });
        if (stockItem && stockItem.quantity) {
          stockItem.quantity -= item.quantity;
          stockItem.quantity > 0
            ? await stockItem.save()
            : await stockItem.destroy();
        }
      });
      return sale;
    } catch (error) {
      throw ApiError.internal('Ошибка при работе с БД');
    }
  }

  async getHistory({
    userId,
    shopId,
    date,
  }: {
    userId: number;
    shopId: number;
    date: Date;
  }) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const dayStart = new Date(date.setHours(0, 0));
    const dayEnd = new Date(date.setHours(23, 59));

    const items = await db.consumptions.findAll({
      where: {
        shopId,
        createdAt: {
          [Op.between]: [dayStart, dayEnd],
        },
      },
      order: [['createdAt', 'ASC']],
    });
    return items;
  }

  async getReciept(consumptionId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    const items = (await db.consumptionItems.findAll({
      where: { consumptionId },
      include: db.items,
    })) as IConsumptionWithItem[];
    return items;
  }

  async getStat(shopId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const dayStart = new Date().setHours(0, 0);
    const dayEnd = new Date().setHours(23, 59);

    const items = await db.consumptions.findAll({
      where: {
        shopId,
        createdAt: {
          [Op.between]: [dayStart, dayEnd],
        },
      },
      order: [['createdAt', 'ASC']],
    });

    const total = items
      .filter((item) => item.isSale)
      .reduce((acc, i) => acc + i.total, 0);
    const card = items
      .filter((item) => item.isSale && item.byCard)
      .reduce((acc, i) => acc + i.total, 0);

    return { total, card };
  }
}

export default new ConsumptionService();
