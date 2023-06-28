export default class UserInfo {
  fisrtName!: string;
  lastName!: string;
  email!: string;

  constructor(init: Partial<UserInfo>) {
    Object.assign(this, init);
  }
}
