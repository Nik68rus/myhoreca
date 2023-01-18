import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';
import { UserRole } from '../types/user';

export interface IPermission
  extends Model<
    InferAttributes<IPermission>,
    InferCreationAttributes<IPermission>
  > {
  id: CreationOptional<number>;
  role: UserRole;
  userId: CreationOptional<number>;
  shopId: CreationOptional<number>;
}

const permissionModel = (sequelize: Sequelize) => {
  const Permission = sequelize.define<IPermission>('permission', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      defaultValue: UserRole.GUEST,
    },
    userId: DataTypes.INTEGER,
    shopId: DataTypes.INTEGER,
  });

  return Permission;
};

export default permissionModel;
