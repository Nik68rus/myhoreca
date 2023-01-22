import { IShopItem } from './../models/shopItem';
import { IItem } from './../models/item';
export interface IItemInput {
  title: string;
  imageUrl: string;
  isCountable: boolean;
  categoryId: number;
}

// export interface IItemWithCategory extends IItem {
//   category: {
//     title: string;
//   };
// }

export interface IArrivalInput {
  shopId: number;
  itemId: number;
  quantity?: number;
  price: number;
}

export interface IArrivalWithItem extends IShopItem {
  item: IItem;
}
