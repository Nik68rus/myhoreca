import { getUserFromRefresh } from './../helpers/token';
import ApiError from '../helpers/error';
import db from '../models';
import UserService from './UserService';

class TokenService {
  async create(userId: number, value: string) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const newToken = await db.tokens.create({ userId, value });
    return newToken;
  }

  async refresh(token: string) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const user = await getUserFromRefresh(token);
    const existingToken = await db.tokens.findOne({
      where: { userId: user.id, value: token },
    });

    if (!existingToken) {
      throw ApiError.notAuthenticated('Токен не действителен!');
    }

    const actualUserData = await db.users.findByPk(user.id);

    if (!actualUserData) {
      throw ApiError.notAuthorized('Пользователь больше не существует');
    }

    const result = await UserService.generateData(actualUserData);

    if (result) {
      await existingToken.destroy();
      await this.create(result.id, result.refreshToken);
    }

    return result;
  }

  async deleteToken(userId: number, token: string) {
    const existingToken = await db.tokens.findOne({
      where: { userId, value: token },
    });

    if (existingToken) {
      await existingToken.destroy();
    }

    return 'Logout complete';
  }
}

export default new TokenService();
