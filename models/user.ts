import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';
import { UserRole } from '../types/user';

export interface IUser
  extends Model<InferAttributes<IUser>, InferCreationAttributes<IUser>> {
  id: CreationOptional<number>;
  email: string;
  password: string;
  name: string;
  activationCode: string;
  isActivated: CreationOptional<boolean>;
  role: CreationOptional<UserRole>;
}

const userModel = (sequelize: Sequelize) => {
  const User = sequelize.define<IUser>('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activationCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActivated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      defaultValue: UserRole.GUEST,
    },
  });

  return User;
};

export default userModel;
