export enum UserRole {
  ADMIN = 'admin',
  OWNER = 'owner',
  CASHIER = 'cashier',
  GUEST = 'guest',
}

export interface TokenPayload {
  id: number;
  spaceId: number;
  email: string;
  name: string;
  role: UserRole;
  isActivated: boolean;
}

export interface IUserLoginData {
  email: string;
  password: string;
}
export interface IUserRegData {
  email: string;
  name: string;
  password: string;
  password2: string;
  role?: UserRole;
  space: string;
}

export interface IUserAuthData extends TokenPayload {
  accessToken: string;
  refreshToken: string;
}

export interface IUserUpdateData {
  // id: number;
  email: string;
  name?: string;
  password?: string;
  role?: UserRole;
  isActivated?: boolean;
  activationCode?: string;
  recoveryCode?: string;
  isBlocked?: boolean;
}
