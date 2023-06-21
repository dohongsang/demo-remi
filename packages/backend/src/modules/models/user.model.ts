import { UserEntity } from "../../core/db/entities/user";
import { BaseModel } from "./base.model";

export class User extends BaseModel {
  firstName: string;
  lastName: string;
  email: string;

  constructor(user: Partial<UserEntity>) {
    super(user);
    Object.assign(this, this.toDto(user));
  }

  toDto(user: Partial<UserEntity>) {
    return {
      ...this.baseToDto(user),
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    };
  }
}
