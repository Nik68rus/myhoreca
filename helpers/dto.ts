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
