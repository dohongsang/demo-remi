import { Inject, Service } from "typedi";
import { UserDao } from "../../../common/dao/user.dao";
import { UserModel } from "../models/user.model";
import { UserInfoResponse } from "../rest/models/user-info/user-info.res";

@Service()
export class UserService {
  constructor(@Inject() private readonly userDao: UserDao) {}

  async createUserProfile(payload: UserModel) {
    return await this.userDao.insert(payload);
  }

  async findMe(id: string): Promise<Partial<UserInfoResponse>> {
    const result = await this.userDao.findOne({ id });
    return UserModel.mappingToDomain(result);
  }
}
