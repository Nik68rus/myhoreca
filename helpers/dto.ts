import { IRecieptServerInfo } from './../redux/api/consumption';
import { ILastReciept, IRecieptItem } from '../redux/slices/recieptSlice';
import { IArrivalWithItem } from './../types/item';
import { IShopData } from './../types/shop';
import { TokenPayload } from './../types/user';

export const userDataDto = (userData: TokenPayload) => {
  const { id, spaceId, email, name, role, isActivated } = userData;
  return { id, spaceId, email, name, role, isActivated };
};

export const shopDto = (shopData: IShopData) => {
  const { id, spaceId, title } = shopData;
  return { id, spaceId, title };
};

export const recieptItemDto = (stockItem: IArrivalWithItem): IRecieptItem => {
  const { price, item } = stockItem;

  return {
    itemId: item.id,
    categoryId: item.categoryId,
    title: item.title,
    price,
    cupId: item.cupId,
  };
};

export const lastRecieptDto = (
  reciept: IRecieptServerInfo | null
): ILastReciept | null => {
  if (reciept === null) return null;
  return {
    createdAt: new Date(reciept.createdAt),
    items: reciept.items.map((position) => ({
      id: position.id,
      title: position.item.title,
      quantity: position.quantity,
      price: position.price,
      toGo: position.toGo,
    })),
  };
};
