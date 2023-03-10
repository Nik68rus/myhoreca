import { PayType } from './../types/item';
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';

export interface IConsumption
  extends Model<
    InferAttributes<IConsumption>,
    InferCreationAttributes<IConsumption>
  > {
  id: CreationOptional<number>;
  userId: number;
  shopId: number;
  isSale: boolean;
  payType: CreationOptional<PayType>;
  isDiscount: CreationOptional<boolean>;
  total: number;
  comment: CreationOptional<string>;
  createdAt: CreationOptional<Date>;
}

const consumptionModel = (sequelize: Sequelize) => {
  const Consumption = sequelize.define<IConsumption>('consumption', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    shopId: DataTypes.INTEGER,
    isSale: DataTypes.BOOLEAN,
    payType: DataTypes.ENUM(...Object.values(PayType)),
    isDiscount: DataTypes.BOOLEAN,
    total: DataTypes.FLOAT,
    comment: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
  });

  return Consumption;
};

export default consumptionModel;
