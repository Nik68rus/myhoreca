import * as pg from 'pg';
import { Sequelize } from 'sequelize';
import userModel from './user';
import shopModel from './shop';
import permissionModel from './permission';
import itemModel from './item';
import shopItemModel from './shopItem';
import spaceModel from './space';
import categoryModel from './category';
import consumptionModel from './consumption';
import consumptionItemModel from './consumptionItem';
import discountModel from './discount';
import cupModel from './cup';

interface DB {
  sequelize: Sequelize;
  spaces: ReturnType<typeof spaceModel>;
  users: ReturnType<typeof userModel>;
  shops: ReturnType<typeof shopModel>;
  permissions: ReturnType<typeof permissionModel>;
  items: ReturnType<typeof itemModel>;
  shopItems: ReturnType<typeof shopItemModel>;
  categories: ReturnType<typeof categoryModel>;
  consumptions: ReturnType<typeof consumptionModel>;
  consumptionItems: ReturnType<typeof consumptionItemModel>;
  discounts: ReturnType<typeof discountModel>;
  cups: ReturnType<typeof cupModel>;
}

console.log(pg.Client.name);

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

sequelize.authenticate();
sequelize.sync();

const Space = spaceModel(sequelize);
const User = userModel(sequelize);
const Shop = shopModel(sequelize);
const Permission = permissionModel(sequelize);
const Item = itemModel(sequelize);
const ShopItem = shopItemModel(sequelize);
const Category = categoryModel(sequelize);
const Consumption = consumptionModel(sequelize);
const ConsumptionItem = consumptionItemModel(sequelize);
const Discount = discountModel(sequelize);
const Cup = cupModel(sequelize);

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

Shop.hasMany(ShopItem);
ShopItem.belongsTo(Shop);

Item.hasMany(ShopItem);
ShopItem.belongsTo(Item);

Shop.hasMany(Consumption);
Consumption.belongsTo(Shop);

User.hasMany(Consumption);
Consumption.belongsTo(User);

Consumption.hasMany(ConsumptionItem);
ConsumptionItem.belongsTo(Consumption);

ConsumptionItem.belongsTo(Item);

ConsumptionItem.hasOne(Cup);

Category.hasOne(Discount);
Discount.belongsTo(Category);

const db: DB = {
  sequelize,
  spaces: Space,
  users: User,
  shops: Shop,
  permissions: Permission,
  items: Item,
  shopItems: ShopItem,
  categories: Category,
  consumptions: Consumption,
  consumptionItems: ConsumptionItem,
  discounts: Discount,
  cups: Cup,
};

export default db;
