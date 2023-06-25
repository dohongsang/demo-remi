import jwt from "jsonwebtoken";
import { isEqual } from "lodash";
import { ForbiddenError, NotFoundError } from "routing-controllers";
import { Inject, Service } from "typedi";
import { EntityManager } from "typeorm";
import { AccountDao } from "../../../common/dao/account.dao";
import { UserDao } from "../../../common/dao/user.dao";
import { Password } from "../../../core";
import { UserModel } from "../../user/models/user.model";
import { AccountModel } from "../models/account.model";
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
    const accountExisted = await this.accountDao.findOne({
      email: req.email,
    });

    if (accountExisted) {
      throw new ForbiddenError("Data existed on system.");
    }

    // Hash password
    const accountModel = new AccountModel(req);
    const password = new Password();
    const hashKey = password.generateHashKey();

    accountModel.hashKey = hashKey;
    accountModel.hashPassword = password.encryptPassword(req.password, hashKey);
    accountModel.createdBy = "system-user";

    // Transaction for registering, creating user info
    let accountCreated: any = null;
    await this.accountDao.transaction(async (entityManager: EntityManager) => {
      const userModel = new UserModel(req);
      const userProfile = await this.userDao.insert(userModel, entityManager);

      accountModel.profile = userProfile;
      await this.accountDao.insert(accountModel, entityManager);
    });

    return {
      accessToken: jwt.sign(
        {
          info: {
            id: accountCreated?.raw?.id,
            email: accountCreated?.raw?.email,
          },
        },
        process.env.SECRET_HASH_KEY || "",
        { algorithm: "HS512", expiresIn: "30d" }
      ),
    };
  }

  async userLogin(req: UserLoginRequest): Promise<Partial<UserLoginResponse>> {
    const account = await this.accountDao.findOne({ email: req.username });
    if (!account) throw new NotFoundError();

    // Decrypt password
    const password = new Password();
    const passwordDecrypted = password.decryptPassword(
      account.hash_password,
      account.hash_key
    );

    if (!isEqual(req.password, passwordDecrypted)) {
      throw new ForbiddenError("username, password not match!");
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
