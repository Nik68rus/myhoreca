import jwt, { JwtPayload } from 'jsonwebtoken';
import ApiError from '../helpers/error';
import db from '../models';
import { UserRole } from '../types/user';

export interface TokenPayload {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  isActivated: boolean;
}

class TokenService {
  constructor() {
    db.sequelize.authenticate();
    db.sequelize.sync();
  }

  generateTokens(payload: TokenPayload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });

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

  validateAccessToken(token: string) {
    console.log(token);
    if (!token) {
      return null;
    }

    try {
      const userData = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET
      ) as TokenPayload;
      return userData;
    } catch (error) {
      return null;
    }
  }

  async validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET
      ) as TokenPayload;
      return userData;
    } catch (error) {
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
