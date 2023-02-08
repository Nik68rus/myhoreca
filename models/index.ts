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
import groupModel from './group';
import tokenModel from './token';
// import arrivalModel from './arrival';

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
  groups: ReturnType<typeof groupModel>;
  tokens: ReturnType<typeof tokenModel>;
  // arrivals: ReturnType<typeof arrivalModel>;
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
const Group = groupModel(sequelize);
const Token = tokenModel(sequelize);
// const Arrival = arrivalModel(sequelize);

Space.hasMany(User);
User.belongsTo(Space);

Space.hasMany(Shop);
Shop.belongsTo(Space);

Space.hasMany(Item);
Item.belongsTo(Space);

Space.hasMany(Category);
Category.belongsTo(Space);

Space.hasMany(Discount);
Discount.belongsTo(Space);

Space.hasMany(Cup);
Cup.belongsTo(Space);

Space.hasMany(Group);
Group.belongsTo(Space);

Category.hasMany(Group);
Group.belongsTo(Category);

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

Cup.hasMany(ConsumptionItem);

Category.hasOne(Discount);
Discount.belongsTo(Category);

User.hasMany(Token);
Token.belongsTo(User);

// Arrival.hasOne(Item);
// Item.belongsTo(Arrival);

// User.hasMany(Arrival);
// Arrival.belongsTo(User);

// Shop.hasMany(Arrival);
// Arrival.belongsTo(Shop);

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
  groups: Group,
  tokens: Token,
  // arrivals: Arrival,
};

export default db;
