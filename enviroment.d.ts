declare namespace NodeJS {
  interface ProcessEnv {
    readonly DB_NAME: string;
    readonly DB_USER: string;
    readonly DB_PASSWORD: string;
    readonly DB_HOST: string;
    readonly DB_PORT: string;
    readonly JWT_ACCESS_SECRET: string;
    readonly JWT_REFRESH_SECRET: string;
    readonly MAIL_USER: string;
    readonly MAIL_PASSWORD: string;
    readonly MAIL_HOST: string;
    readonly MAIL_PORT: string;
    readonly APP_URL: string;
    readonly NEXT_PUBLIC_TEST: string;
  }
}
