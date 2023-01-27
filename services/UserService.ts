import { userDataDto } from './../helpers/dto';
import { IShop } from '../models/shop';
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
  //генерация токенов и информации о пользователе
  async generateData(user: IUser) {
    const accessToken = await generateToken(
      userDataDto(user),
      process.env.JWT_ACCESS_SECRET,
      60 * 60 * 12 //Токен валиден 12 часов
    );

    const refreshToken = await generateToken(
      userDataDto(user),
      process.env.JWT_REFRESH_SECRET,
      60 * 60 * 24 * 15 //Токен валиден 15 дней
    );

    const result: IUserAuthData = {
      ...userDataDto(user),
      accessToken,
      refreshToken,
    };

    return result;
  }

  //создание главного пользователя пространства
  async create(userData: {
    email: string;
    password: string;
    name: string;
    role?: UserRole;
    spaceId: number;
  }) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const { email, password, name, role, spaceId } = userData;

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
      spaceId,
      role: role ? role : UserRole.GUEST,
    });

    await MailService.sendActivationMail(email);

    return this.generateData(user);
  }

  //активация главного пользователя
  async activate(code: string) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const user = await db.users.findOne({ where: { activationCode: code } });

    if (!user) {
      throw ApiError.notFound('Пользователь не найден!');
    }

    user.isActivated = true;

    await user.save();
    return user;
  }

  //отправка письма с кодом сброса пароля
  async startRecover(email: string) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

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
    return 'Ссылка отпралена';
  }

  //валидация ссылки для восстановления пароля из письма
  async validateRecovery(code: string) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const user = await db.users.findOne({ where: { resetCode: code } });

    if (!user) {
      throw ApiError.notFound('Пользователь не найден!');
    }

    if (user.resetCodeExpiration < new Date(Date.now())) {
      throw ApiError.badRequest('Время действия ссылки истекло!');
    }

    return user.email;
  }

  //завершение восстановления и установка нового пароля
  async finishRecover(code: string, password: string) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

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

    return user;
  }

  //создать пользователя-кассира
  async createCashier(email: string, spaceId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const activationCode = uuidv4();
    const user = await db.users.create({
      email,
      name: '',
      password: '',
      spaceId,
      activationCode,
      role: UserRole.CASHIER,
    });

    return user;
  }

  // выслать кассиру приглашение и предоставить доступ
  async invite(email: string, owner: string, shop: IShop) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    let employee = await db.users.findOne({ where: { email } });

    if (employee && employee.role !== UserRole.CASHIER) {
      throw ApiError.badRequest(
        'Пользователь зарегистрирован с неверной ролью!'
      );
    }

    if (!employee) {
      employee = await this.createCashier(email, shop.spaceId);
      await PermissionService.create(employee.id, shop.id, UserRole.CASHIER);
      await MailService.sendInviteActivationMail(employee, owner, shop);
    } else {
      await PermissionService.create(employee.id, shop.id, UserRole.CASHIER);
      await MailService.sendInviteNotififcationMail(email, owner, shop);
    }

    return employee;
  }

  // получить список сотрудников пространства
  async getEmployees(spaceId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const employees = await db.users.findAll({ where: { spaceId } });
    return employees;
  }

  async findByCode(code: string) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const user = await db.users.findOne({
      where: { activationCode: code },
      include: db.spaces,
    });

    if (!user) {
      throw ApiError.notFound('Пользователь не найден!');
    }

    return user;
  }

  //обновить данные пользователя
  async update(data: Partial<IUser>) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const {
      id,
      email,
      name,
      password,
      isActivated,
      role,
      activationCode,
      isBlocked,
    } = data;
    const user = await db.users.findOne({ where: { id } });

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
    if (isBlocked !== undefined) user.isBlocked = isBlocked;

    await user.save();

    return user;
  }

  //получить данные пользователя по id
  async getById(userId: number) {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const user = await db.users.findByPk(userId);
    return user;
  }
}

export default new UserService();
