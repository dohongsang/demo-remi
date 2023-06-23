import { UserProfileEntity } from "../../core/db/entities/user-profile";
import { BaseModel } from "./base.model";

export class UserModel extends BaseModel {
  firstName: string;
  lastName: string;
  email: string;

  constructor(user?: Partial<UserModel>) {
    super(user);
    Object.assign(this, user);
  }

  mappingToDao() {
    return {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
    };
  }

  mappingToDomain(entity: UserProfileEntity) {
    return {
      email: entity.email,
      firstName: entity.first_name,
      lastName: entity.last_name,
    };
  }
}
