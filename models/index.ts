import * as pg from 'pg';
import { Sequelize } from 'sequelize';
import userModel from './user';
import shopModel from './shop';
import permissionModel from './permission';
import itemModel from './item';
import shopItemModel from './shopItem';
import spaceModel from './space';
import categoryModel from './category';

interface DB {
  connect: () => void;
  sequelize: Sequelize;
  spaces: ReturnType<typeof spaceModel>;
  users: ReturnType<typeof userModel>;
  shops: ReturnType<typeof shopModel>;
  permissions: ReturnType<typeof permissionModel>;
  items: ReturnType<typeof itemModel>;
  shopItems: ReturnType<typeof shopItemModel>;
  categories: ReturnType<typeof categoryModel>;
}

console.log(pg.Client.name);
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

const Space = spaceModel(sequelize);
const User = userModel(sequelize);
const Shop = shopModel(sequelize);
const Permission = permissionModel(sequelize);
const Item = itemModel(sequelize);
const ShopItem = shopItemModel(sequelize);
const Category = categoryModel(sequelize);

Space.hasMany(User);
User.belongsTo(Space);

Space.hasMany(Shop);
Shop.belongsTo(Space);

Space.hasMany(Item);
Item.belongsTo(Space);

Space.hasMany(Category);
Category.belongsTo(Space);

Item.belongsTo(Category);
Category.hasMany(Item);

User.hasMany(Permission);
Permission.belongsTo(User);

Shop.hasMany(Permission);
Permission.belongsTo(Shop);

Item.belongsToMany(Shop, { through: ShopItem });

// Shop.hasMany(ShopItem);
// ShopItem.belongsTo(Shop);

// Item.hasMany(ShopItem);
// ShopItem.belongsTo(Item);

let connected = false;

const db: DB = {
  connect() {
    this.sequelize = connect();
    this.sequelize.authenticate();
    this.sequelize.sync();
  },
  sequelize,
  spaces: Space,
  users: User,
  shops: Shop,
  permissions: Permission,
  items: Item,
  shopItems: ShopItem,
  categories: Category,
};

export default db;
