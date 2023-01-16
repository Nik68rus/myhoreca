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
  userId: CreationOptional<number>;
  title: string;
  imageUrl: string;
  isCountable: boolean;
}

const itemModel = (sequelize: Sequelize) => {
  const Item = sequelize.define<IItem>('item', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCountable: DataTypes.BOOLEAN,
  });

  return Item;
};

export default itemModel;
