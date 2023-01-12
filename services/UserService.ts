import { IUserAuthData, UserRole } from './../types/user';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import ApiError from '../helpers/error';
import db from '../models';
import MailService from './MailService';
import { IUser } from '../models/user';
import tokenService from './TokenService';

class UserService {
  constructor() {
    db.sequelize.authenticate();
    db.sequelize.sync();
  }

  async generateData(user: IUser) {
    const tokens = tokenService.generateTokens({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActivated: user.isActivated,
    });

    await tokenService.saveTokens(user.id, tokens.refreshToken);

    const result: IUserAuthData = {
      email: user.email,
      name: user.name,
      role: user.role,
      isActivated: user.isActivated,
      ...tokens,
    };
    return result;
  }

  async create(email: string, password: string, name: string, role?: UserRole) {
    const existingUser = await db.users.findOne({ where: { email } });

    if (existingUser) {
      throw ApiError.badRequest('Данный e-mail уже зарегистрирован!');
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    const activationCode = uuidv4();
    const user = await db.users.create({
      email,
      name,
      password: hashedPassword,
      activationCode,
      role: role ? role : UserRole.GUEST,
    });

    await MailService.sendActivationMail(email);

    return this.generateData(user);
  }

  async activate(code: string) {
    const user = await db.users.findOne({ where: { activationCode: code } });

    if (!user) {
      throw ApiError.notFound('Пользователь не найден!');
    }

    user.isActivated = true;

    await user.save();

    return user;
  }
}

export default new UserService();
