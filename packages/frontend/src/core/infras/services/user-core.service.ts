import { AuthService } from "../../../shared/services/auth.service";
import UserInfo from "../../models/user-info";

export class UserCoreService {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  async excute(): Promise<UserInfo> {
    const { data } = await this.service.findMe<any, UserInfo>();
    return data;
  }
}
