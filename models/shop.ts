import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';

export interface IShop
  extends Model<InferAttributes<IShop>, InferCreationAttributes<IShop>> {
  id: CreationOptional<number>;
  spaceId: CreationOptional<number>;
  title: string;
}

const shopModel = (sequelize: Sequelize) => {
  const Shop = sequelize.define<IShop>('shop', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    spaceId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return Shop;
};

export default shopModel;
