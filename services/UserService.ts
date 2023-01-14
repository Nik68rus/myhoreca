import { IUserAuthData, UserRole } from './../types/user';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import ApiError from '../helpers/error';
import db from '../models';
import MailService from './MailService';
import { IUser } from '../models/user';
import { generateToken } from '../helpers/token';

class UserService {
  constructor() {
    db.connect();
  }

  async generateData(user: IUser) {
    const token = await generateToken(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActivated: user.isActivated,
      },
      process.env.JWT_ACCESS_SECRET,
      60 * 60
    );

    const result: IUserAuthData = {
      email: user.email,
      name: user.name,
      role: user.role,
      isActivated: user.isActivated,
      accessToken: token,
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

    db.sequelize.close();

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
    db.sequelize.close();

    return user;
  }

  async startRecover(email: string) {
    const normEmail = email.trim();
    const user = await db.users.findOne({ where: { email: normEmail } });

    if (!user) {
      throw ApiError.notFound('Пользователь не найден!');
    }

    const resetCode = uuidv4();
    user.resetCode = resetCode;
    user.resetCodeExpiration = new Date(Date.now() + 2 * 60 * 60 * 1000);
    await user.save();
    await MailService.sendRecoveryMail(normEmail);
    db.sequelize.close();
    return 'Ссылка отпралена';
  }

  async validateRecovery(code: string) {
    const user = await db.users.findOne({ where: { resetCode: code } });

    if (!user) {
      throw ApiError.notFound('Пользователь не найден!');
    }

    if (user.resetCodeExpiration < new Date(Date.now())) {
      throw ApiError.badRequest('Время действия ссылки истекло!');
    }

    db.sequelize.close();

    return user.email;
  }

  async finishRecover(code: string, password: string) {
    const user = await db.users.findOne({ where: { resetCode: code } });

    if (!user) {
      throw ApiError.notFound('Пользователь не найден!');
    }

    if (user.resetCodeExpiration < new Date(Date.now())) {
      throw ApiError.badRequest('Время действия ссылки истекло!');
    }

    const hashedPassword = await bcrypt.hash(password, 3);

    user.password = hashedPassword;
    user.resetCode = null;
    user.resetCodeExpiration = new Date(Date.now());

    await user.save();
    db.sequelize.close();

    return user;
  }
}

export default new UserService();
