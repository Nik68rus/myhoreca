import { DetailedConsumption } from './ConsumptionService';
import { IConsumption } from './../models/consumption';
import { IArrival } from './../models/arrival';
import { IItemInput } from './../types/item';
import ApiError from '../helpers/error';
import db from '../models';
import { Op } from 'sequelize';

interface IMovementParams {
  itemId: number;
  shopId: number;
  from: string;
  to: string;
}

interface IArrivalWithUser extends IArrival {
  user: {
    name: string;
  };
}

export interface IMovement {
  type: 'arrival' | 'consumption';
  quantity: number;
  price: number;
  user: string;
  createdAt: Date;
}

class ItemService {
  async create(item: IItemInput & { spaceId: number; isVisible: boolean }) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const normTitle = item.title.trim();

    if (normTitle.length < 3) {
      throw ApiError.validation('Слишком короткое название!');
    }

    const existingItem = await db.items.findOne({
      where: { title: normTitle, spaceId: item.spaceId },
    });

    if (existingItem) {
      throw ApiError.badRequest('Данный товар уже зарегистрирован!');
    }

    const newItem = await db.items.create({ ...item, title: normTitle });
    return newItem;
  }

  async getItems(spaceId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    // await db.items.sync({ force: true });
    const items = await db.items.findAll({
      where: { spaceId },
      order: [['title', 'ASC']],
    });
    return items;
  }

  async getById(itemId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const item = await db.items.findByPk(itemId);
    return item;
  }

  async getSyrup(spaceId: number, shopId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const item = await db.items.findOne({ where: { spaceId, title: 'Сироп' } });
    if (!item) {
      return null;
    }
    const syrup = await db.shopItems.findOne({
      where: { itemId: item.id, shopId },
      include: db.items,
    });
    return syrup;
  }

  async getMovements({ itemId, shopId, from, to }: IMovementParams) {
    const periodStart = new Date(from);
    const periodEnd = new Date(to);

    const arrivals = (await db.arrivals.findAll({
      where: {
        shopId,
        itemId,
        createdAt: {
          [Op.between]: [periodStart, periodEnd],
        },
      },
      include: [{ model: db.users, attributes: ['name'] }],
    })) as IArrivalWithUser[];

    const consumptions = (await db.consumptions.findAll({
      where: { shopId },
      include: [
        {
          model: db.consumptionItems,
          required: true,
          where: {
            itemId,
            createdAt: {
              [Op.between]: [periodStart, periodEnd],
            },
          },
        },
        { model: db.users, attributes: ['name'] },
      ],
    })) as DetailedConsumption[];

    const mappedArrivals: IMovement[] = arrivals.map((arr) => ({
      type: 'arrival',
      quantity: arr.quantity,
      price: arr.price,
      user: arr.user.name,
      createdAt: arr.createdAt,
    }));

    const mappedConsumptions: IMovement[] = consumptions.map((cons) => ({
      type: 'consumption',
      quantity: cons['consumption-items'][0].quantity,
      price: cons['consumption-items'][0].price,
      //@ts-ignore
      user: cons.user.name,
      createdAt: cons.createdAt,
    }));

    const result: IMovement[] = [...mappedArrivals, ...mappedConsumptions].sort(
      (a, b) =>
        Date.parse(a.createdAt.toISOString()) -
        Date.parse(b.createdAt.toISOString())
    );

    return result;
  }
}

export default new ItemService();
