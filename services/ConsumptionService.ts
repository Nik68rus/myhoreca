import { IConsumption } from './../models/consumption';
import { IConsumptionInput, IWriteOff } from './../types/item';
import ApiError from '../helpers/error';
import db from '../models';
import Sales from '../components/cabinet/OwnerCabinet/Sales';

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
  async sale(saleInfo: IConsumptionInput, userId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    const { shopId, isSale, byCard, isDiscount, items, total } = saleInfo;
    if (
      [isSale, byCard, isDiscount, total].some((param) => param === undefined)
    ) {
      throw ApiError.badRequest('Не полные данные!');
    }
    try {
      const sale = await db.consumptions.create({
        userId,
        shopId,
        isSale: isSale!,
        byCard,
        isDiscount,
        total: total!,
      });

      await Promise.allSettled(
        items.map(async (item) => {
          await db.consumptionItems.create({
            consumptionId: sale.id,
            itemId: item.itemId,
            price: item.price,
            toGo: item.toGo!,
          });

          const stockItem = await db.shopItems.findOne({
            where: { itemId: item.itemId },
          });
          if (stockItem && stockItem.quantity) {
            stockItem.quantity--;
            stockItem.quantity > 0
              ? await stockItem.save()
              : await stockItem.destroy();
          }
        })
      );

      // items.forEach(async (item) => {
      //   await db.consumptionItems.create({
      //     consumptionId: sale.id,
      //     itemId: item.itemId,
      //     price: item.price,
      //     toGo: item.toGo!,
      //   });

      //   const stockItem = await db.shopItems.findOne({
      //     where: { itemId: item.itemId },
      //   });
      //   if (stockItem && stockItem.quantity) {
      //     stockItem.quantity--;
      //     stockItem.quantity > 0
      //       ? await stockItem.save()
      //       : await stockItem.destroy();
      //   }
      // });

      return sale;
    } catch (error) {
      throw ApiError.internal('Ошибка при работе с БД');
    }
  }
}

export default new ConsumptionService();
