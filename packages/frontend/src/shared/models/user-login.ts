export default class UserLogin {
  username!: string;
  password!: string;

  constructor(init: Partial<UserLogin>) {
    Object.assign(this, init);
  }
}
