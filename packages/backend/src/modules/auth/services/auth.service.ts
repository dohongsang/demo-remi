import jwt from "jsonwebtoken";
import { isEqual } from "lodash";
import { ForbiddenError, NotFoundError } from "routing-controllers";
import { Inject, Service } from "typedi";
import { EntityManager } from "typeorm";
import { AccountDao } from "../../../common/dao/account.dao";
import { UserDao } from "../../../common/dao/user.dao";
import { Password } from "../../../core";
import { Runner } from "../../../core/websocket";
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
    const passObject = new Password();
    const moAccount = new AccountModel(req);
    const hashKey = passObject.generateHashKey();

    moAccount.hashKey = hashKey;
    moAccount.hashPassword = passObject.encryptPassword(
      passObject.decryptPasswordFromClient(req.password),
      hashKey
    );
    moAccount.createdBy = "system-user";

    // Transaction for registering, creating user info
    await this.accountDao.transaction(async (entityManager: EntityManager) => {
      const userModel = new UserModel(req);
      const userProfile = await this.userDao.insert(userModel, entityManager);

      moAccount.profile = userProfile;
      await this.accountDao.insert(moAccount, entityManager);
    });

    const accountCreated = await this.accountDao.findOne({
      email: req.email,
    });
    if (!accountCreated) throw new NotFoundError();

    return {
      accessToken: jwt.sign(
        {
          info: {
            id: accountCreated?.id,
            email: accountCreated?.email,
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

    if (
      !isEqual(
        password.decryptPasswordFromClient(req.password),
        passwordDecrypted
      )
    ) {
      throw new ForbiddenError("Username / Password not match!");
    }

    return {
      accessToken: jwt.sign(
        {
          info: {
            id: account.id,
            email: account.email,
          },
        },
        process.env.SECRET_HASH_KEY || "",
        { algorithm: "HS512", expiresIn: "30d" }
      ),
    };
  }
}
