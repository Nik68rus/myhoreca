import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';

export interface IGroup
  extends Model<InferAttributes<IGroup>, InferCreationAttributes<IGroup>> {
  id: CreationOptional<number>;
  spaceId: CreationOptional<number>;
  categoryId: number;
  title: string;
}

const groupModel = (sequelize: Sequelize) => {
  const Group = sequelize.define<IGroup>('group', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    spaceId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    title: DataTypes.STRING,
  });

  return Group;
};

export default groupModel;
