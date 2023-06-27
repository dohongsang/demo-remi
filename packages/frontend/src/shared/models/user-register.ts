import CryptoJS from "crypto-js";
import BaseModel from "../../core/models/base";

export default class UserRegister extends BaseModel {
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;

  constructor(init: Partial<UserRegister>) {
    super(init);
    Object.assign(this, init);
    this.encryptPassword();
  }

  encryptPassword() {
    const hash = CryptoJS.SHA512(this.password);
    this.password = CryptoJS.enc.Base64.stringify(hash);
  }
}
