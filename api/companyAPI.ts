import { getCookie } from './../helpers/cookies';
import { ICompany } from './../models/company';

const defaultError = 'Что-то пошло не так';

class CompanyAPI {
  async createCompany(title: string) {
    const response = await fetch('api/company', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('accessToken'),
      },
      body: JSON.stringify({ title }),
    });
    const data = (await response.json()) as string;

    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : defaultError);
    }

    return data;
  }
}

export default new CompanyAPI();
