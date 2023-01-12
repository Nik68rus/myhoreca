import { createContext, useState, useEffect } from 'react';
import { IUserAuthData, UserRole } from '../types/user';

interface Props {
  children: React.ReactNode;
}

interface IAuthContext {
  authData: IUserAuthData;
  setAuthData: (data: IUserAuthData) => void;
  isAuth: boolean;
}

const initialAuthData: IUserAuthData = {
  email: '',
  name: '',
  role: UserRole.GUEST,
  isActivated: false,
  accessToken: '',
  refreshToken: '',
};

const AuthContext = createContext<IAuthContext>({
  authData: initialAuthData,
  setAuthData: () => {},
  isAuth: false,
});

export const AuthContextProvider = (props: Props) => {
  const [auth, setAuth] = useState(initialAuthData);

  const isAuth = () => !!auth.accessToken;

  return (
    <AuthContext.Provider
      value={{
        authData: auth,
        setAuthData: setAuth,
        isAuth: isAuth(),
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
