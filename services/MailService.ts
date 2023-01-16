import { IUser } from './../models/user';
import { ICompany } from './../models/company';
import nodemailer, { Transporter } from 'nodemailer';
import ApiError from '../helpers/error';
import db from '../models';
class MailService {
  transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: +process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendActivationMail(to: string) {
    const user = await db.users.findOne({ where: { email: to } });
    if (user) {
      const link = `${process.env.APP_URL}/api/user/activate/${user.activationCode}`;
      await this.transporter.sendMail({
        from: process.env.MAIL_USER,
        to,
        subject: 'Активация аккаунта на My HoReCa',
        html: `
          <div>
            <h1>Для активации аккаунта перейдите по ссылке</h1>
            <a href="${link}">${link}</a>
          </div>
        `,
      });
    } else {
      throw ApiError.notFound('Пользователь не найден!');
    }
  }

  async sendRecoveryMail(to: string) {
    const user = await db.users.findOne({ where: { email: to } });
    if (user) {
      const link = `${process.env.APP_URL}/api/user/recover/${user.resetCode}`;
      await this.transporter.sendMail({
        from: process.env.MAIL_USER,
        to,
        subject: 'Сброс пароля на My HoReCa',
        html: `
          <div>
            <h1>Для установки нового пароля перейдите по ссылке</h1>
            <a href="${link}">${link}</a>
          </div>
        `,
      });
    } else {
      throw ApiError.notFound('Пользователь не найден!');
    }
  }

  async sendInviteNotififcationMail(
    to: string,
    from: string,
    company: ICompany
  ) {
    await this.transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject: 'Предоставление прав доступа в сервисе My HoReCa',
      html: `
        <div>
          <h1>Пользователь ${from} предоставил вам доступ к точке продаж ${company.title}</h1>
          <p>С вашей стороны не требуется никаких дополнительных действий!</p>
        </div>
      `,
    });
  }

  async sendInviteActivationMail(
    employee: IUser,
    from: string,
    company: ICompany
  ) {
    const link = `${process.env.APP_URL}/api/user/invite/${employee.activationCode}`;

    await this.transporter.sendMail({
      from: process.env.MAIL_USER,
      to: employee.email,
      subject: `Приглашение присоединиться к точке продаж ${company.title} в сервисе My HoReCa`,
      html: `
        <div>
          <h1>Пользователь ${from} приглашает вас присоединиться к точке продаж ${company.title}</h1>
          <p>Пройдите по <a href=${link}>ссылке</a> и создайте аккаунт для работы в сервисе!</p>
        </div>
      `,
    });
  }
}

export default new MailService();
