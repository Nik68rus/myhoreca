import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';

export interface IShopItem
  extends Model<
    InferAttributes<IShopItem>,
    InferCreationAttributes<IShopItem>
  > {
  id: CreationOptional<number>;
  shopId: CreationOptional<number>;
  itemId: CreationOptional<number>;
  quantity: number;
  price: number;
}

const shopItemModel = (sequelize: Sequelize) => {
  const ShopItem = sequelize.define<IShopItem>('shop-item', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shopId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return ShopItem;
};

export default shopItemModel;
