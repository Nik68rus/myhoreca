import { IUserRegData, IUserAuthData } from './../types/user';

class UserAPI {
  async createUser(userData: IUserRegData) {
    const response = await fetch('api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    console.log(response);

    const data = (await response.json()) as IUserAuthData;
    console.log(data);
    return data;
  }
}

export default new UserAPI();
