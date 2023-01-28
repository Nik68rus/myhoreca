import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';

export interface IDiscount
  extends Model<
    InferAttributes<IDiscount>,
    InferCreationAttributes<IDiscount>
  > {
  id: CreationOptional<number>;
  spaceId: CreationOptional<number>;
  categoryId: CreationOptional<number>;
  value: number;
}

const discountModel = (sequelize: Sequelize) => {
  const Discount = sequelize.define<IDiscount>('discount', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    spaceId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
  });

  return Discount;
};

export default discountModel;
