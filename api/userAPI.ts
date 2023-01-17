import { IUser } from './../models/user';
import { ICompany } from './../models/company';
import { getCookie } from './../helpers/cookies';
import { toast } from 'react-toastify';
import { IUserRegData, IUserAuthData, UserRole } from './../types/user';

const defaultError = 'Что-то пошло не так';

class UserAPI {
  // async inviteEmployee(email: string, company: ICompany) {
  //   const response = await fetch(`api/user/invite`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${getCookie('accessToken')}`,
  //     },
  //     body: JSON.stringify({ email, company }),
  //   });

  //   const data = (await response.json()) as IUser;

  //   if (!response.ok) {
  //     throw new Error(typeof data === 'string' ? data : defaultError);
  //   }

  //   return data;
  // }

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
