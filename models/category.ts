import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';

export interface ICategory
  extends Model<
    InferAttributes<ICategory>,
    InferCreationAttributes<ICategory>
  > {
  id: CreationOptional<number>;
  spaceId: CreationOptional<number>;
  title: string;
}

const categoryModel = (sequelize: Sequelize) => {
  const Category = sequelize.define<ICategory>('category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    spaceId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Category;
};

export default categoryModel;
