import ApiError from '../helpers/error';
import db from '../models';

class SalaryService {
  async createOrEdit(shopId: number, amount: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    if (amount <= 0) {
      throw ApiError.validation('Указано недопустимое значение зарплаты');
    }

    const existingSalary = await db.salaries.findOne({
      where: { shopId },
    });

    if (existingSalary) {
      existingSalary.amount = amount;

      await existingSalary.save();

      return existingSalary;
    } else {
      const salary = await db.salaries.create({
        shopId,
        amount,
      });

      return salary;
    }
  }

  async get(shopId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const salary = await db.salaries.findOne({ where: { shopId } });

    if (!salary) {
      throw ApiError.notFound('Запись не найдена!');
    }

    return salary;
  }
}

export default new SalaryService();
