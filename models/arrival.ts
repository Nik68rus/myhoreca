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
  shopId: CreationOptional<number>;
  itemId: CreationOptional<number>;
  userId: CreationOptional<number>;
  quantity: number;
  price: number;
  createdAt: CreationOptional<Date>;
}

const arrivalModel = (sequelize: Sequelize) => {
  const Arrival = sequelize.define<IArrival>('arrival', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shopId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
  });

  return Arrival;
};

export default arrivalModel;
