import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import Axios from 'axios';

import { User } from '../../../../Model/User/User';

import { AuthLocalStorage } from './AuthStorage/AuthLocalStorage';

export interface IAuthData {
  user: User | undefined;
}

export const AuthContext = React.createContext({
  data: (undefined as any) as IAuthData,
  login: (undefined as any) as (userName: string, password: string) => Promise<undefined>,
  logout: (undefined as any) as () => Promise<undefined>,
});

export const AuthProvider = withRouter(
  (props: RouteComponentProps): JSX.Element => {
    const authLocalStorage = new AuthLocalStorage();

    const loginDataUrl = `http://localhost:8000/auth/login`;

    const login = async (userName: string, password: string): Promise<any> => {
      const loginResponse = await Axios.post(loginDataUrl, {
        login: userName,
        password: password,
      })
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.log(error);
        });

      if (loginResponse !== undefined) {
        authLocalStorage.user = new User(userName, loginResponse.access_token);

        props.history.replace('/personal');

        return true;
      }
      return;
    };

    const logout = async (): Promise<undefined> => {
      authLocalStorage.user = undefined;
      props.history.replace('/');

      return;
    };

    const data: IAuthData = {
      user: authLocalStorage.user,
    };

    return <AuthContext.Provider value={{ data, login, logout }} {...props} />;
  },
);

export const useAuth = () => React.useContext(AuthContext);
