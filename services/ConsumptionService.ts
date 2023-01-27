import { IConsumptionInput } from './../types/item';
import ApiError from '../helpers/error';
import db from '../models';

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

  async getHistory(userId: number, date: string) {
    return [{ id: 1, title: 'rrrr' }];
  }
}

export default new ConsumptionService();
