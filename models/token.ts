import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';

interface Token
  extends Model<InferAttributes<Token>, InferCreationAttributes<Token>> {
  id: CreationOptional<number>;
  userId: CreationOptional<number>;
  refreshToken: string;
}

const tokenModel = (sequelize: Sequelize) =>
  sequelize.define<Token>('token', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
  });

export default tokenModel;
