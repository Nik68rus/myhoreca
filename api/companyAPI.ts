import { ICompany } from './../models/company';

class CompanyAPI {
  async createCompany(title: string) {
    const response = await fetch('api/company', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    const data = (await response.json()) as ICompany;

    console.log(data);
    return data;
  }
}

export default new CompanyAPI();
