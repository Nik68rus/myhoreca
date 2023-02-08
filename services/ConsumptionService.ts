import { IConsumptionItem } from './../models/consumptionItem';
import {
  IConsumptionInput,
  IConsumptionWithItem,
  PayType,
} from './../types/item';
import ApiError from '../helpers/error';
import db from '../models';
import { Op } from 'sequelize';
import { IItem } from '../models/item';

class ConsumptionService {
  async consume(saleInfo: IConsumptionInput, userId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    // await db.consumptionItems.sync({ force: true });
    const { shopId, isSale, payType, isDiscount, items, total, comment } =
      saleInfo;
    if (
      [isSale, payType, isDiscount, total].some((param) => param === undefined)
    ) {
      throw ApiError.badRequest('Не полные данные!');
    }
    try {
      const sale = await db.consumptions.create({
        userId,
        shopId,
        isSale,
        payType,
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
          cupId: item.cupId ? item.cupId : undefined,
          withSyrup: item.withSyrup,
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
      console.log(error);
      throw ApiError.internal('Ошибка при работе с БД');
    }
  }

  async getHistory({ shopId, date }: { shopId: number; date: Date }) {
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
      .filter((item) => item.isSale && item.payType === PayType.CARD)
      .reduce((acc, i) => acc + i.total, 0);
    const transfer = items
      .filter((item) => item.isSale && item.payType === PayType.TRANSFER)
      .reduce((acc, i) => acc + i.total, 0);

    return { total, card, transfer };
  }

  async getLast(shopId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const dayStart = new Date().setHours(0, 0);
    const dayEnd = new Date().setHours(23, 59);

    const items = await db.consumptions.findAll({
      where: {
        shopId,
        isSale: true,
        createdAt: {
          [Op.between]: [dayStart, dayEnd],
        },
      },
      order: [['createdAt', 'ASC']],
    });

    const lastItem = items.slice().pop();
    if (!lastItem) {
      return null;
    }

    const recieptItems = await db.consumptionItems.findAll({
      where: { consumptionId: lastItem.id },
      include: { model: db.items, attributes: ['title'] },
    });

    return {
      createdAt: lastItem.createdAt,
      items: recieptItems,
    };
  }
}

export default new ConsumptionService();
