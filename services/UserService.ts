import { ICompany } from './../models/company';
import { IUserAuthData, IUserUpdateData, UserRole } from './../types/user';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import ApiError from '../helpers/error';
import db from '../models';
import MailService from './MailService';
import { IUser } from '../models/user';
import { generateToken } from '../helpers/token';
import PermissionService from './PermissionService';

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
      60 * 60 * 12 //Токен валиден 12 часов
    );

    const result: IUserAuthData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActivated: user.isActivated,
      accessToken: token,
    };

    return result;
  }

  async createCashier(email: string) {
    const activationCode = uuidv4();
    const user = await db.users.create({
      email,
      name: '',
      password: '',
      activationCode,
      role: UserRole.CASHIER,
    });

    // db.sequelize.close();
    return user;
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

  async invite(email: string, owner: string, company: ICompany) {
    let employee = await db.users.findOne({ where: { email } });

    if (employee && employee.role === UserRole.CASHIER) {
      await MailService.sendInviteNotififcationMail(email, owner, company);
      await PermissionService.create(employee.id, company.id, UserRole.CASHIER);
    }

    if (!employee) {
      employee = await this.createCashier(email);
      await MailService.sendInviteActivationMail(employee, owner, company);
      await PermissionService.create(employee.id, company.id, UserRole.CASHIER);
    }

    return employee;
  }

  async findByCode(code: string) {
    const user = await db.users.findOne({ where: { activationCode: code } });

    if (!user) {
      throw ApiError.notFound('Пользователь не найден!');
    }

    return user;
  }

  async update(data: IUserUpdateData) {
    const {
      email,
      name,
      password,
      isActivated,
      role,
      activationCode,
      isBlocked,
    } = data;
    const user = await db.users.findOne({ where: { email } });

    if (!user) {
      throw ApiError.notFound('Пользователь не найден!');
    }

    if (name) user.name = name;
    if (password) {
      user.password = await bcrypt.hash(password, 3);
    }
    if (isActivated) user.isActivated = isActivated;
    if (role) user.role = role;
    if (activationCode) user.activationCode = activationCode;
    if (isBlocked) user.isBlocked = isBlocked;

    await user.save();

    return user;
  }
}

export default new UserService();
