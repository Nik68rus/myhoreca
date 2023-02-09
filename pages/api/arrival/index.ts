import { IShopItem } from './../../../models/shopItem';
import { IArrivalInput } from './../../../types/item';
import { getAdmin, getUser } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import db from '../../../models';
import ShopService from '../../../services/ShopService';
import ItemService from '../../../services/ItemService';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IArrivalInput;
  query: {
    shopId: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { shopId, itemId, price, quantity } = req.body;
    // db.shopItems.sync({ force: false });

    try {
      const user = await getAdmin(req);
      const shop = await ShopService.getById(shopId);
      const item = await ItemService.getById(itemId);

      if (!shop || !item) {
        throw ApiError.badRequest('Неверно указана точка продаж или товар!');
      }

      if (user.spaceId !== shop.spaceId) {
        throw ApiError.notAuthorized('Недостаточно прав!');
      }

      const existingArrival = await db.shopItems.findOne({
        where: { itemId, shopId },
      });
      let result: IShopItem;
      if (existingArrival) {
        existingArrival.price = price;
        if (item.isCountable && quantity) {
          existingArrival.quantity += quantity;
        }
        result = await existingArrival.save();
      } else {
        result = await db.shopItems.create(req.body);
      }
      await db.arrivals.create({ userId: user.id, shopId, itemId, quantity });
      return res.status(201).json(result);
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'GET') {
    const { shopId } = req.query;
    try {
      await db.sequelize.authenticate();
      await db.sequelize.sync();

      if (!shopId) throw ApiError.badRequest('Не предоставлен id магазина');
      await getUser(req);
      const items = await db.shopItems.findAll({
        where: { shopId },
        include: [{ model: db.items }],
        order: [[db.items, 'title', 'ASC']],
      });
      return res.status(200).json(items);
    } catch (err) {
      handleServerError(res, err);
    }
  }
}
