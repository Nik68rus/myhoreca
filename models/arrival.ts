import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';

export interface IArrival
  extends Model<InferAttributes<IArrival>, InferCreationAttributes<IArrival>> {
  id: CreationOptional<number>;
  userId: CreationOptional<number>;
  shopId: CreationOptional<number>;
  itemId: CreationOptional<number>;
  quantity: CreationOptional<number>;
}

const arrivalModel = (sequelize: Sequelize) => {
  const Arrival = sequelize.define<IArrival>('shop-item', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    shopId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  });

  return Arrival;
};

export default arrivalModel;
