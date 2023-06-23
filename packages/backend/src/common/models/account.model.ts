import { UserAccountEntity } from "../../core/db/entities/user-account";
import { BaseModel } from "./base.model";

export class AccountModel extends BaseModel {
  email: string;
  hashKey: string;
  hashPassword: string;
  profile: BaseModel;

  constructor(user?: Partial<AccountModel>) {
    super(user);
    Object.assign(this, user);
  }

  mappingToDao() {
    return {
      email: this.email,
      hash_key: this.hashKey,
      hash_password: this.hashPassword,
      profile: this.profile,
    };
  }

  mappingToDomain(entity: UserAccountEntity) {
    return {
      email: entity.email,
      hashKey: entity.hash_key,
      hashPassword: entity.hash_password,
      profile: entity.profile,
    };
  }
}
