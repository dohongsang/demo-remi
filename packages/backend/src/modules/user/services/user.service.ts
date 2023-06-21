import { Service } from "typedi";
import { User } from "../../models/user.model";
import { UserLoginResponse } from "../rest/models/user-login/user-login.res";

@Service()
export class UserService {
  constructor() {}

  async userLogin(): Promise<Partial<UserLoginResponse>> {
    return new User({ first_name: "asdasd", last_name: "asdasdasd" });
  }
}
