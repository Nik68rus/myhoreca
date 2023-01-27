import { ISpace } from './../../models/space';
import { IShopData } from './../../types/shop';
import { IUser } from './../../models/user';
import { IUserAuthData, IUserRegData, UserRole } from './../../types/user';
import { api } from '../api';

interface IResetPassword {
  code: string;
  body: {
    password: string;
    password2: string;
  };
}

export const userApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    //регистрация главного пользователя
    createUser: builder.mutation<
      IUserAuthData,
      IUserRegData & { role: UserRole }
    >({
      query: (body) => ({
        url: 'user/signup',
        method: 'POST',
        body,
      }),
    }),

    //повторно выслать код активации главного пользователя по запросу
    sendActivation: builder.mutation<string, void>({
      query: () => ({
        url: 'user/activate',
        method: 'POST',
      }),
    }),

    //логин пользователя
    login: builder.mutation<IUserAuthData, { email: string; password: string }>(
      {
        query: (body) => ({
          url: 'user/auth',
          method: 'POST',
          body,
        }),
      }
    ),

    // проверить статус авторизации
    checkUserAuth: builder.query<IUserAuthData, void>({
      query: () => 'user/auth',
    }),

    //отправить ссылку на восстановление забытого пароля
    startRecovery: builder.mutation<string, string>({
      query: (email) => ({
        url: 'user/recover',
        method: 'POST',
        body: { email },
      }),
    }),

    //валидация ссылки для сброса пароля
    validateRecovery: builder.query<string, string>({
      query: (code) => `user/recover?code=${code}`,
    }),

    //установка нового пароля
    finishRecovery: builder.mutation<string, IResetPassword>({
      query: ({ code, body }) => ({
        url: `user/recover/${code}`,
        method: 'POST',
        body,
      }),
    }),

    // получить список сотрудников торговой точки
    getEmployees: builder.query<IUser[], number>({
      query: (shopId) => `user/employee?shopId=${shopId}`,
      providesTags: ['Employee'],
    }),

    //отправка инвайта сотруднику
    inviteEmployee: builder.mutation<IUser, { email: string; shop: IShopData }>(
      {
        query: (body) => ({
          url: 'user/employee',
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Employee'],
      }
    ),

    //получить данные о пользователе по коду инвайта
    getByCode: builder.mutation<IUser & { space: ISpace }, string>({
      query: (code) => ({ url: `user/employee/${code}`, method: 'POST' }),
    }),

    //активация профиля и заполнение личных данных сотрудником
    activateEmployee: builder.mutation<
      IUser,
      Partial<IUser> & { password2: string }
    >({
      query: (body) => ({
        url: `user/${body.id}?code=${body.activationCode}`,
        method: 'PATCH',
        body,
        invalidatesTags: ['Employee'],
      }),
    }),

    //редактирование пользователя администратором
    editEmployee: builder.mutation<
      IUser,
      Partial<IUser & { password2: string }>
    >({
      query: (body) => ({
        url: `user/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Employee'],
    }),

    //получить данные пользователя по id
    getUserData: builder.query<IUser, number>({
      query: (userId) => `user/${userId}`,
      providesTags: ['Employee'],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useActivateEmployeeMutation,
  useLoginMutation,
  useCheckUserAuthQuery,
  useSendActivationMutation,
  useStartRecoveryMutation,
  useValidateRecoveryQuery,
  useFinishRecoveryMutation,
  useInviteEmployeeMutation,
  useGetByCodeMutation,
  useGetEmployeesQuery,
  useEditEmployeeMutation,
  useGetUserDataQuery,
} = userApi;
