import { createContext, useState, useEffect, useCallback } from 'react';
import { IUserAuthData, UserRole } from '../types/user';

interface Props {
  children: React.ReactNode;
}

interface IAuthContext {
  authData: IUserAuthData | null;
  setAuthData: (data: IUserAuthData | null) => void;
  loading: boolean;
  setLoading: (state: boolean) => void;
}

// const initialAuthData: IUserAuthData = {
//   email: '',
//   name: '',
//   role: UserRole.GUEST,
//   isActivated: false,
//   accessToken: '',
// };

const AuthContext = createContext<IAuthContext>({
  authData: null,
  setAuthData: () => {},
  loading: true,
  setLoading: () => {},
});

export const AuthContextProvider = (props: Props) => {
  const [auth, setAuth] = useState<IUserAuthData | null>(null);
  const [loading, setLoading] = useState(true);

  const setAuthData = useCallback((authData: IUserAuthData | null) => {
    setAuth(authData);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authData: auth,
        setAuthData,
        loading,
        setLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
