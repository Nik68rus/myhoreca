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
}

export interface IUserLoginData {
  email: string;
  password: string;
}

export interface IUserAuthData {
  email: string;
  name: string;
  isAdmin: boolean;
  isActivated: boolean;
  // accessToken: string;
  // refreshToken: string;
}
