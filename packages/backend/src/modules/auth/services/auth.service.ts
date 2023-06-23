import jwt from "jsonwebtoken";
import { isEqual } from "lodash";
import { Inject, Service } from "typedi";
import { AccountDao } from "../../../common/dao/account.dao";
import { UserDao } from "../../../common/dao/user.dao";
import { AccountModel } from "../../../common/models/account.model";
import { UserModel } from "../../../common/models/user.model";
import { EntityNotFoundException, Password } from "../../../core";
import { UserLoginRequest } from "../rest/models/user-login/user-login.req";
import { UserLoginResponse } from "../rest/models/user-login/user-login.res";
import { UserRegisterRequest } from "../rest/models/user-register/user-register.req";
import { UserRegisterResponse } from "../rest/models/user-register/user-register.res";

@Service()
export class AuthService {
  constructor(
    @Inject() private readonly userDao: UserDao,
    @Inject() private readonly accountDao: AccountDao
  ) {}

  async userRegister(
    req: UserRegisterRequest
  ): Promise<Partial<UserRegisterResponse>> {
    // Hash password
    const accountModel = new AccountModel(req);
    const password = new Password();
    const hashKey = password.generateHashKey();

    accountModel.hashKey = hashKey;
    accountModel.hashPassword = password.encryptPassword(req.password, hashKey);
    accountModel.createdBy = "system-user";

    // Transaction for registering, creating user info
    let accountCreated: any = null;
    await this.accountDao.transaction(async () => {
      const userModel = new UserModel(req);
      const userProfile = await this.userDao.insert(userModel);

      accountModel.profile = userProfile;
      accountCreated = await this.accountDao.insert(accountModel);
    });

    if (accountCreated) {
      return {
        accessToken: jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            info: {
              id: accountCreated.id,
              email: accountCreated.email,
            },
          },
          process.env.SECRET_HASH_KEY || "",
          { algorithm: "HS512" }
        ),
      };
    } else {
      throw new Error("Somethings went wrong!");
    }
  }

  async userLogin(req: UserLoginRequest): Promise<Partial<UserLoginResponse>> {
    const account = await this.accountDao.findOne({ email: req.username });
    if (!account) throw new EntityNotFoundException();

    // Decrypt password
    const password = new Password();
    const passwordDecrypted = password.decryptPassword(
      account.hash_password,
      account.hash_key
    );    

    if (!isEqual(req.password, passwordDecrypted)) {
      throw new EntityNotFoundException();
    }

    return {
      accessToken: jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          info: {
            id: account.id,
            email: account.email,
          },
        },
        process.env.SECRET_HASH_KEY || "",
        { algorithm: "HS512" }
      ),
    };
  }
}
