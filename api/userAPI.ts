import { IUser } from './../models/user';
import { ICompany } from './../models/company';
import { getCookie } from './../helpers/cookies';
import { toast } from 'react-toastify';
import { IUserRegData, IUserAuthData, UserRole } from './../types/user';

const defaultError = 'Что-то пошло не так';

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

  async sendActivationCode() {
    const response = await fetch(`api/user/activate`, {
      method: 'POST',
      headers: {
        'Contetn-Type': 'application/json',
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    const data = await response.json();

    if (response.ok) {
      return data as string;
    } else {
      throw new Error(typeof data === 'string' ? data : defaultError);
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
      throw new Error(typeof data === 'string' ? data : defaultError);
    }
  }

  async checkAuth() {
    const response = await fetch('api/user/auth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('accessToken'),
      },
    });

    const data = (await response.json()) as IUserAuthData;

    if (response.ok) {
      return data;
    } else {
      return null;
    }
  }

  async startRecover(email: string) {
    const response = await fetch('api/user/recover', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : defaultError);
    }

    return data;
  }

  async validateRecoverCode(code: string) {
    const response = await fetch(`api/user/recover?code=${code}`);

    return response.ok ? true : false;
  }

  async finishRecover(
    code: string,
    formData: { password: string; password2: string }
  ) {
    const response = await fetch(`api/user/recover/${code}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : defaultError);
    }

    return data;
  }

  async inviteEmployee(email: string, company: ICompany) {
    const response = await fetch(`api/user/invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
      body: JSON.stringify({ email, company }),
    });

    const data = (await response.json()) as IUser;

    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : defaultError);
    }

    return data;
  }

  async getEmployees(companyId: number) {
    const response = await fetch(`api/user/employees?companyId=${companyId}`);

    const data = (await response.json()) as IUser[];

    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : defaultError);
    }

    return data;
  }

  async getByCode(code: string) {
    const response = await fetch(`api/user?code=${code}`);

    const data = (await response.json()) as IUser;

    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : defaultError);
    }

    return data;
  }

  async activateCashier(userData: IUserRegData) {
    const response = await fetch(`api/user/signup`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userData }),
    });

    const data = (await response.json()) as IUser;

    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : defaultError);
    }

    return data;
  }
}

export default new UserAPI();
