import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';

export interface ISpace
  extends Model<InferAttributes<ISpace>, InferCreationAttributes<ISpace>> {
  id: CreationOptional<number>;
  title: string;
  // userId: CreationOptional<number>;
}

const spaceModel = (sequelize: Sequelize) => {
  const Space = sequelize.define<ISpace>('space', {
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
    // userId: DataTypes.INTEGER,
  });

  return Space;
};

export default spaceModel;
