import { generateToken, validateToken } from './../helpers/token';

import ApiError from '../helpers/error';
import db from '../models';
import { TokenPayload, UserRole } from '../types/user';
class TokenService {
  constructor() {
    db.sequelize.authenticate();
    db.sequelize.sync();
  }

  async generateTokens(payload: TokenPayload) {
    const accessToken = await generateToken(
      payload,
      process.env.JWT_ACCESS_SECRET,
      20
    );
    const refreshToken = await generateToken(
      payload,
      process.env.JWT_REFRESH_SECRET,
      60 * 60 * 24 * 10
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveTokens(userId: number, refreshToken: string) {
    const existingToken = await db.tokens.findOne({ where: { userId } });
    if (existingToken) {
      existingToken.refreshToken = refreshToken;
      await existingToken.save();
      return existingToken;
    }

    const token = await db.tokens.create({ userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken: string) {
    const token = await db.tokens.findOne({ where: { refreshToken } });

    if (!token) {
      throw ApiError.notFound('Что-то пошло не так! Попробуйте позднее!');
    }

    await token.destroy();

    return true;
  }

  async validateAccessToken(token: string) {
    try {
      const payload = await validateToken(token, process.env.JWT_ACCESS_SECRET);
      return payload;
    } catch (err) {
      return null;
    }
  }

  async validateRefreshToken(token: string) {
    try {
      const payload = await validateToken(
        token,
        process.env.JWT_REFRESH_SECRET
      );
      return payload;
    } catch (err) {
      return null;
    }
  }

  async findToken(token: string) {
    try {
      return await db.tokens.findOne({ where: { refreshToken: token } });
    } catch (error) {
      return null;
    }
  }
}

export default new TokenService();
