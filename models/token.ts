import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';

export interface IToken
  extends Model<InferAttributes<IToken>, InferCreationAttributes<IToken>> {
  id: CreationOptional<number>;
  userId: CreationOptional<number>;
  value: string;
}

const tokenModel = (sequelize: Sequelize) => {
  const Token = sequelize.define<IToken>('token', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return Token;
};

export default tokenModel;
