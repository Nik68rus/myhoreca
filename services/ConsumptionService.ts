import { IConsumption } from './../models/consumption';
import { IConsumptionInput, IWriteOff } from './../types/item';
import ApiError from '../helpers/error';
import db from '../models';

class ConsumptionService {
  async writeOff({
    userId,
    shopId,
    comment,
    itemId,
    quantity,
  }: IWriteOff & { userId: number }) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const shopItem = await db.shopItems.findOne({ where: { shopId, itemId } });

    if (!shopItem) {
      throw ApiError.notFound('Позиция не найдена в магазине!');
    }

    if (shopItem.quantity < quantity) {
      throw ApiError.badRequest(
        'Вы пытаетесь списать больше максимально возможного количества!'
      );
    }

    shopItem.quantity -= quantity;
    shopItem.quantity === 0 ? await shopItem.destroy() : await shopItem.save();

    let data = {
      userId,
      shopId,
      isSale: false,
      byCard: false,
      isDiscount: false,
      total: 0,
      comment,
    };

    const consumption = await db.consumptions.create(data);

    for (let i = 1; i <= quantity; i++) {
      await db.consumptionItems.create({
        consumptionId: consumption.id,
        itemId,
        price: 0,
        toGo: false,
      });
    }

    return consumption;
  }
}

export default new ConsumptionService();
