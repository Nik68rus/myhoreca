export enum UserRole {
  ADMIN = 'admin',
  OWNER = 'owner',
  CASHIER = 'cashier',
  GUEST = 'guest',
}

export interface IUserRegData {
  email: string;
  name: string;
  password: string;
  password2: string;
  role?: UserRole;
}

export interface IUserLoginData {
  email: string;
  password: string;
}

export interface IUserAuthData {
  email: string;
  name: string;
  role: UserRole;
  isActivated: boolean;
  accessToken: string;
  refreshToken: string;
}
