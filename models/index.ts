import { Sequelize } from 'sequelize';
import userModel from './user';
import companyModel from './company';
import tokenModel from './token';

interface DB {
  sequelize: Sequelize;
  users: ReturnType<typeof userModel>;
  tokens: ReturnType<typeof tokenModel>;
  companies: ReturnType<typeof companyModel>;
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

const User = userModel(sequelize);
const Company = companyModel(sequelize);
const Token = tokenModel(sequelize);

User.hasOne(Token);
Token.belongsTo(User);
// Company.hasMany(User);
// User.belongsTo(Company);

const db: DB = {
  sequelize,
  users: User,
  tokens: Token,
  companies: Company,
};

export default db;
