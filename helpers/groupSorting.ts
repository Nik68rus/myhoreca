import { IArrivalWithItem } from '../types/item';
import { IGroup } from './../models/group';

export interface IGroupReady {
  id: number;
  isGroup: boolean;
  title: string;
  categoryId: number;
  items: IArrivalWithItem[];
}

const sortItems = (
  groups: IGroup[],
  items: IArrivalWithItem[]
): (IGroupReady | IArrivalWithItem)[] => {
  const grouppedItems: IGroupReady[] = groups
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

export default sortItems;
