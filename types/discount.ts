import { ICategory } from '../models/category';
import { IDiscount } from '../models/discount';

export interface IDiscountRequestBody {
  categoryId: number;
  value: number;
}
export interface IDiscountInput extends IDiscountRequestBody {
  spaceId: number;
}

export interface IDiscountWithCategory extends IDiscount {
  category: ICategory;
}
