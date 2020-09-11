export class User {
  public login: string;
  public token: string;

  public constructor(login: string, token: string) {
    this.login = login;
    this.token = token;
  }
}
