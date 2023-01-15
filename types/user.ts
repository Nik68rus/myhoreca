export enum UserRole {
  ADMIN = 'admin',
  OWNER = 'owner',
  CASHIER = 'cashier',
  GUEST = 'guest',
}

export interface TokenPayload {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  isActivated: boolean;
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
  id: number;
  email: string;
  name: string;
  role: UserRole;
  isActivated: boolean;
  accessToken: string;
}
