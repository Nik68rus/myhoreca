import { IItemInput } from './../types/item';
import { IItem } from './../models/item';
const defaultError = 'Что-то пошло не так';

class ItemAPI {
  async createItem(item: IItemInput) {
    const response = await fetch('api/item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    const data = (await response.json()) as IItem;

    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : defaultError);
    }

    return data;
  }

  async getItems(ownerId: number) {
    const response = await fetch(`api/item`);

    const data = (await response.json()) as IItem[];

    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : defaultError);
    }

    return data;
  }
}

export default new ItemAPI();
