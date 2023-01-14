import { Sequelize } from 'sequelize';
import userModel from './user';
import companyModel from './company';

interface DB {
  connect: () => void;
  sequelize: Sequelize;
  users: ReturnType<typeof userModel>;
  companies: ReturnType<typeof companyModel>;
}

const connect = () => {
  return new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
    }
  );
};

const sequelize = connect();

const User = userModel(sequelize);
const Company = companyModel(sequelize);

// Company.hasMany(User);
// User.belongsTo(Company);

let connected = false;

const db: DB = {
  connect() {
    this.sequelize = connect();
    this.sequelize.authenticate();
    this.sequelize.sync();
  },
  sequelize,
  users: User,
  companies: Company,
};

export default db;
