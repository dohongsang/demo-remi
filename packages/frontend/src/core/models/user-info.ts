export default class UserInfo {
  id!: string;
  fisrtName!: string;
  lastName!: string;
  email!: string;

  constructor(init: Partial<UserInfo>) {
    Object.assign(this, init);
  }
}
