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
    console.log('sending mail');
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
}

export default new MailService();
