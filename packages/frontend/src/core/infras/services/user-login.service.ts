import CryptoJS from "crypto-js";
import { UserLoginRequest, UserLoginResponse } from "../models/user-login";
import { ApplicationConfig } from "../../utils/config";
import { AuthService } from "../../../shared/services/auth.service";

export class UserLoginService {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  async excute(req: UserLoginRequest): Promise<UserLoginResponse> {
    if (req.password) {
      req.password = this.encryptPassword(
        req.password,
        ApplicationConfig.VITE_SECRET_HASH_KEY
      );
    }

    const { data } = await this.service.userLogin<
      UserLoginRequest,
      UserLoginResponse
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
