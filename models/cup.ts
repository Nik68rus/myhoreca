import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';

export interface ICup
  extends Model<InferAttributes<ICup>, InferCreationAttributes<ICup>> {
  id: CreationOptional<number>;
  spaceId: CreationOptional<number>;
  title: string;
}

const cupModel = (sequelize: Sequelize) => {
  const Cup = sequelize.define<ICup>('cup', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    spaceId: DataTypes.INTEGER,
    title: DataTypes.STRING,
  });

  return Cup;
};

export default cupModel;
