import { IRecieptItem } from '../redux/slices/recieptSlice';
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
    toGo: false,
  };
};
