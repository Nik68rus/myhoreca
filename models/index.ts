import { Sequelize } from 'sequelize';
import userModel, { IUser } from './user';

interface DB {
  sequelize: Sequelize;
  users: ReturnType<typeof userModel>;
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
  }
);

const db: DB = {
  sequelize,
  users: userModel(sequelize),
};

export default db;
