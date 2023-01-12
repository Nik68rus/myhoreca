import { getCookie } from './../helpers/cookies';
import { toast } from 'react-toastify';
import { IUserRegData, IUserAuthData, UserRole } from './../types/user';

class UserAPI {
  async createUser(userData: IUserRegData, role: UserRole) {
    const response = await fetch(`api/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userData, role }),
    });

    const data = await response.json();

    if (response.ok) {
      return data as IUserAuthData;
    } else {
      throw new Error(data);
    }
  }

  async login(email: string, password: string) {
    const response = await fetch('api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return data as IUserAuthData;
    } else {
      throw new Error(data);
    }
  }

  async checkAuth() {
    const response = await fetch('api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('accessToken'),
      },
    });
  }
}

export default new UserAPI();
