import { DetailedConsumption } from './ConsumptionService';
import { Op } from 'sequelize';
import ApiError from '../helpers/error';
import db from '../models';
import { IConsumption } from '../models/consumption';
import { IConsumptionItem } from '../models/consumptionItem';

interface IConsumptionItemWithCup extends IConsumptionItem {
  cup: {
    title: string;
  };
}

export interface IDetailedConsumptionWithCup extends IConsumption {
  ['consumption-items']: IConsumptionItemWithCup[];
}

export interface ICupHistory {
  cupId: number;
  title: string;
  quantity: number;
}

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

  async getStat(params: { shopId: number; from: string; to: string }) {
    const { shopId, from, to } = params;
    const periodStart = new Date(from);
    const periodEnd = new Date(to);

    const consumptions = (await db.consumptions.findAll({
      where: {
        shopId,
        isSale: true,
        createdAt: {
          [Op.between]: [periodStart, periodEnd],
        },
      },
      // attributes: [],
      include: [
        {
          model: db.consumptionItems,
          // attributes: ['quantity', 'cupId'],
          required: true,
          where: {
            toGo: true,
            cupId: {
              [Op.ne]: null,
            },
          },
          include: [
            {
              model: db.cups,
              attributes: ['title'],
            },
          ],
        },
      ],
    })) as IDetailedConsumptionWithCup[];

    const mappedConsumptions: ICupHistory[] = consumptions
      .map((cons) => cons['consumption-items'])
      .flat()
      .map((item) => ({
        cupId: item.cupId,
        title: item.cup.title,
        quantity: item.quantity,
      }));

    const result: ICupHistory[] = [];

    mappedConsumptions.forEach((item) => {
      const index = result.findIndex((i) => i.cupId === item.cupId);
      if (index < 0) {
        result.push(item);
      } else {
        result[index].quantity += item.quantity;
      }
    });

    return result;
  }
}

export default new CupService();
