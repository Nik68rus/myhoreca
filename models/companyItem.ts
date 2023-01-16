import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';

export interface ICompanyItem
  extends Model<
    InferAttributes<ICompanyItem>,
    InferCreationAttributes<ICompanyItem>
  > {
  id: CreationOptional<number>;
  companyId: CreationOptional<number>;
  itemId: CreationOptional<number>;
  quantity: number;
  price: number;
}

const companyItemModel = (sequelize: Sequelize) => {
  const Item = sequelize.define<ICompanyItem>('company-item', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    companyId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return Item;
};

export default companyItemModel;
