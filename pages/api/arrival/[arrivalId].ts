import { IShopItem } from './../../../models/shopItem';
import { getAdmin } from './../../../helpers/token';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleServerError } from '../../../helpers/error';
import db from '../../../models';
import { IShop } from '../../../models/shop';

interface ShopItemWithShop extends IShopItem {
  shop: IShop;
}

interface ExtendedNextApiRequest extends NextApiRequest {
  body: Partial<IShopItem>;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    const { id, price } = req.body;

    try {
      await db.sequelize.authenticate();
      await db.sequelize.sync();
      const user = await getAdmin(req);
      const shopItem = await db.shopItems.findByPk(id);
      if (!price) throw ApiError.badRequest('Не указана цена!');
      if (!shopItem) throw ApiError.notFound('Товар не найден');
      shopItem.price = price;
      await shopItem.save();
      return res.status(200).json(shopItem);
    } catch (error) {
      handleServerError(res, error);
    }
  }

  if (req.method === 'DELETE') {
    const id = req.query.arrivalId as string;

    try {
      await db.sequelize.authenticate();
      await db.sequelize.sync();
      const user = await getAdmin(req);
      const shopItem = (await db.shopItems.findOne({
        where: { id: +id },
        include: [db.shops],
      })) as ShopItemWithShop | null;
      if (!shopItem) throw ApiError.notFound('Позиция не найдена!');
      if (shopItem.shop.spaceId !== user.spaceId)
        throw ApiError.notAuthorized('Не достаточно прав');
      await shopItem.destroy();
      return res.status(200).json('Success!');
    } catch (error) {
      handleServerError(res, error);
    }
  }
}
