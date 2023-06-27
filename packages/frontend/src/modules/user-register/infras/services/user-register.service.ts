import CryptoJS from "crypto-js";
import { ApplicationConfig } from "../../../../core/utils/config";
import { AuthService } from "../../../../shared/services/auth.service";
import {
  IUserRegisterRequest,
  IUserRegisterResponse,
} from "../models/user-register";

export class UserRegisterService {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  async excute(req: IUserRegisterRequest): Promise<IUserRegisterResponse> {
    if (req.password) {
      req.password = this.encryptPassword(
        req.password,
        ApplicationConfig.VITE_SECRET_HASH_KEY
      );
    }

    const { data } = await this.service.userRegister<
      IUserRegisterRequest,
      IUserRegisterResponse
    >(req);

    return data;
  }

  encryptPassword(plainText: string, hashKey: string): string {
    const encrypted = CryptoJS.AES.encrypt(plainText, hashKey, {
      keySize: 32,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted + "";
  }
}
