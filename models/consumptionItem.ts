import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';

export interface IConsumptionItem
  extends Model<
    InferAttributes<IConsumptionItem>,
    InferCreationAttributes<IConsumptionItem>
  > {
  id: CreationOptional<number>;
  consumptionId: CreationOptional<number>;
  itemId: CreationOptional<number>;
  toGo: boolean;
  price: number;
}

const consumptionItemModel = (sequelize: Sequelize) => {
  const ConsumptionItem = sequelize.define<IConsumptionItem>(
    'consumption-item',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      consumptionId: DataTypes.INTEGER,
      itemId: DataTypes.INTEGER,
      toGo: DataTypes.BOOLEAN,
      price: DataTypes.FLOAT,
    }
  );

  return ConsumptionItem;
};

export default consumptionItemModel;
