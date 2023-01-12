import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';

export interface ICompany
  extends Model<InferAttributes<ICompany>, InferCreationAttributes<ICompany>> {
  id: CreationOptional<number>;
  title: string;
}

const companyModel = (sequelize: Sequelize) => {
  const Company = sequelize.define<ICompany>('company', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return Company;
};

export default companyModel;
