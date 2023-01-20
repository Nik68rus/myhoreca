import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';

export interface IItem
  extends Model<InferAttributes<IItem>, InferCreationAttributes<IItem>> {
  id: CreationOptional<number>;
  categoryId: CreationOptional<number>;
  spaceId: CreationOptional<number>;
  title: string;
  imageUrl: CreationOptional<string>;
  isCountable: boolean;
}

const itemModel = (sequelize: Sequelize) => {
  const Item = sequelize.define<IItem>('item', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryId: DataTypes.INTEGER,
    spaceId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imageUrl: DataTypes.STRING,
    isCountable: DataTypes.BOOLEAN,
  });

  return Item;
};

export default itemModel;
