import { IConsumptionItem } from './../models/consumptionItem';
import { IShopItem } from './../models/shopItem';
import { IItem } from './../models/item';
export interface IItemInput {
  title: string;
  imageUrl: string;
  isCountable: boolean;
  categoryId: number;
}

export interface IArrivalInput {
  shopId: number;
  itemId: number;
  quantity?: number;
  price: number;
}

export interface IArrivalWithItem extends IShopItem {
  item: IItem;
}

export interface IToRecieptItem extends IArrivalWithItem {
  discount: number;
}

export interface IConsumptionItemInput {
  itemId: number;
  price: number;
  quantity: number;
  toGo: boolean;
}

export interface IConsumptionInput {
  shopId: number;
  isSale: boolean;
  byCard: boolean;
  isDiscount: boolean;
  comment?: string;
  items: IConsumptionItemInput[];
  total: number;
}

export interface IConsumptionWithItem extends IConsumptionItem {
  item: IItem;
}
