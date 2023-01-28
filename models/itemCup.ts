import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';

export interface IItemCup
  extends Model<InferAttributes<IItemCup>, InferCreationAttributes<IItemCup>> {
  id: CreationOptional<number>;
  cupId: CreationOptional<number>;
  itemId: CreationOptional<number>;
}

const itemCupModel = (sequelize: Sequelize) => {
  const ItemCup = sequelize.define<IItemCup>('item-cup', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cupId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
  });

  return ItemCup;
};

export default itemCupModel;
