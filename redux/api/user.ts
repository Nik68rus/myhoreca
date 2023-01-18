import { ICompany } from './../../models/company';
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
    // проверить статус авторизации
    checkUserAuth: builder.query<IUserAuthData, void>({
      query: () => 'user/auth',
    }),

    // получить список сотрудников торговой точки
    getEmployees: builder.query<IUser[], number>({
      query: (companyId) => `user/employees?companyId=${companyId}`,
      providesTags: ['Employee'],
    }),

    //получить данные о пользователе по коду инвайта
    getByCode: builder.query<IUser, string>({
      query: (code) => `user?code=${code}`,
    }),

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

    //логин пользователя
    login: builder.mutation<IUserAuthData, { email: string; password: string }>(
      {
        query: (body) => ({
          url: 'user',
          method: 'POST',
          body,
        }),
      }
    ),

    //повторно выслать код активации главного пользователя по запросу
    sendActivation: builder.mutation<string, void>({
      query: () => ({
        url: 'user/activate',
        method: 'POST',
      }),
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

    //отправка инвайта сотруднику
    inviteEmployee: builder.mutation<
      IUser,
      { email: string; company: ICompany }
    >({
      query: (body) => ({
        url: 'user/invite',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Employee'],
    }),

    //активация профиля и заполнение личных данных сотрудником
    activateEmployee: builder.mutation<IUser, IUserRegData>({
      query: (body) => ({
        url: 'user/signup',
        method: 'PATCH',
        body,
      }),
    }),

    //редактирование пользователя администратором
    editEmployee: builder.mutation<IUser, Partial<IUser>>({
      query: (body) => ({
        url: `user/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Employee'],
    }),
  }),
});

export const {
  useCheckUserAuthQuery,
  useGetEmployeesQuery,
  useGetByCodeQuery,
  useCreateUserMutation,
  useLoginMutation,
  useSendActivationMutation,
  useStartRecoveryMutation,
  useValidateRecoveryQuery,
  useFinishRecoveryMutation,
  useInviteEmployeeMutation,
  useActivateEmployeeMutation,
  useEditEmployeeMutation,
} = userApi;
