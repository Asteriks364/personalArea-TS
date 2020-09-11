import { User } from '../../../../../Model/User/User';

export interface IAuthStorage {
  user: User | undefined;
}

enum AuthLocalStorageKey {
  Token = 'TS_user_token',
  UserName = 'TS_user_name',
}

export class AuthLocalStorage implements IAuthStorage {
  private static getValue(key: string) {
    const value = window.localStorage.getItem(key);

    return value === null ? undefined : value;
  }

  private static removeValue(key: string) {
    window.localStorage.removeItem(key);
  }

  private static setValue(key: string, value: string | undefined) {
    window.localStorage.setItem(key, value === undefined ? '' : value);
  }

  private _user: User | undefined;

  public constructor() {
    const login = AuthLocalStorage.getValue(AuthLocalStorageKey.UserName);
    const token = AuthLocalStorage.getValue(AuthLocalStorageKey.Token);
    if (login !== undefined && token !== undefined) {
      this._user = new User(login, token);
    }
  }

  public get user(): User | undefined {
    return this._user;
  }

  public set user(value: User | undefined) {
    this._user = value;

    if (this._user === undefined) {
      AuthLocalStorage.removeValue(AuthLocalStorageKey.UserName);
      AuthLocalStorage.removeValue(AuthLocalStorageKey.Token);
    } else {
      AuthLocalStorage.setValue(AuthLocalStorageKey.UserName, this._user.login);
      AuthLocalStorage.setValue(AuthLocalStorageKey.Token, this._user.token);
    }
  }
}
