import { IMenuItem } from '../services/ShopService';
import { IArrivalWithItem } from '../types/item';
import { IGroup } from './../models/group';

export interface IGroupReady<T> {
  id: number;
  isGroup: boolean;
  title: string;
  categoryId: number;
  items: T[];
}

export interface IMenuGroupItem {
  id: number;
  title: string;
  price: number;
}

export const sortItems = (
  groups: IGroup[],
  items: IArrivalWithItem[]
): (IGroupReady<IArrivalWithItem> | IArrivalWithItem)[] => {
  const grouppedItems: IGroupReady<IArrivalWithItem>[] = groups
    .map((group) => ({
      id: group.id,
      isGroup: true,
      title: group.title,
      categoryId: group.categoryId,
      items: items.filter(
        (stockItem) =>
          stockItem.item.categoryId === group.categoryId &&
          stockItem.item.title.startsWith(group.title)
      ),
    }))
    .filter((group) => group.items.length > 1);

  const grouppedIds = grouppedItems
    .flatMap((gi) => gi.items)
    .map((item) => item.itemId);

  const singleItems = items.filter(
    (item) => !grouppedIds.some((id) => id === item.itemId)
  );

  return [...grouppedItems, ...singleItems];
};

export const groupMenuItems = (
  groups: IGroup[],
  items: IMenuItem[]
): (IGroupReady<IMenuGroupItem> | IMenuItem)[] => {
  const grouppedItems: IGroupReady<IMenuGroupItem>[] = groups
    .map((group) => ({
      id: group.id,
      isGroup: true,
      title: group.title,
      categoryId: group.categoryId,
      items: items
        .filter(
          (menuItem) =>
            menuItem.categoryId === group.categoryId &&
            menuItem.title.startsWith(group.title)
        )
        .map((item) => ({
          id: item.id,
          title: item.title.replace(group.title, '').trim(),
          price: item.price,
        }))
        .sort((a, b) => a.price - b.price),
    }))
    .filter((group) => group.items.length > 1);

  const grouppedIds = grouppedItems
    .flatMap((gi) => gi.items)
    .map((item) => item.id);

  const singleItems = items.filter(
    (item) => !grouppedIds.some((id) => id === item.id)
  );

  return [...grouppedItems, ...singleItems];
};
