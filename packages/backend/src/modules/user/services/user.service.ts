import { Inject, Service } from "typedi";
import { UserDao } from "../../../common/dao/user.dao";
import { UserInfoResponse } from "../rest/models/user-info/user-info.res";
import { UserModel } from "../models/user.model";

@Service()
export class UserService {
  constructor(@Inject() private readonly userDao: UserDao) {}

  async createUserProfile(payload: UserModel) {
    return await this.userDao.insert(payload);
  }

  async findMe(id: string): Promise<Partial<UserInfoResponse>> {
    return await this.userDao.findOne({ id });
  }
}
