import { Sequelize } from 'sequelize';
import userModel from './user';
import companyModel from './company';
import permissionModel from './permission';
import itemModel from './item';
import companyItemModel from './companyItem';

interface DB {
  connect: () => void;
  sequelize: Sequelize;
  users: ReturnType<typeof userModel>;
  companies: ReturnType<typeof companyModel>;
  permissions: ReturnType<typeof permissionModel>;
  items: ReturnType<typeof itemModel>;
  companyItems: ReturnType<typeof companyItemModel>;
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
sequelize.authenticate();
sequelize.sync();

const User = userModel(sequelize);
const Company = companyModel(sequelize);
const Permission = permissionModel(sequelize);
const Item = itemModel(sequelize);
const CompanyItem = companyItemModel(sequelize);

User.hasMany(Permission);
Permission.belongsTo(User);
Company.hasMany(Permission);
Permission.belongsTo(Company);

User.hasMany(Item);
Item.belongsTo(User);

Item.belongsToMany(Company, { through: CompanyItem });
Item.belongsTo(User);
User.hasMany(Item);

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
  permissions: Permission,
  items: Item,
  companyItems: CompanyItem,
};

export default db;
