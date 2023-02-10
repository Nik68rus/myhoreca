import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';

export interface ISalary
  extends Model<InferAttributes<ISalary>, InferCreationAttributes<ISalary>> {
  id: CreationOptional<number>;
  shopId: CreationOptional<number>;
  amount: number;
}

const salaryModel = (sequelize: Sequelize) => {
  const Salary = sequelize.define<ISalary>('salary', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shopId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
  });

  return Salary;
};

export default salaryModel;
