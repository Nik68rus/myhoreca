import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';

export interface IUserSalary
  extends Model<
    InferAttributes<IUserSalary>,
    InferCreationAttributes<IUserSalary>
  > {
  id: CreationOptional<number>;
  userId: CreationOptional<number>;
  salaryId: CreationOptional<number>;
  amount: number;
  isPaid: boolean;
}

const userSalaryModel = (sequelize: Sequelize) => {
  const UserSalary = sequelize.define<IUserSalary>('user-salary', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    salaryId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    isPaid: DataTypes.BOOLEAN,
  });

  return UserSalary;
};

export default userSalaryModel;
