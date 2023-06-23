import { Service } from "typedi";
import { UserProfileEntity } from "../../core/db/entities/user-profile";
import { Dao } from "../../core/db/repo";

@Service()
export class UserDao extends Dao {
  constructor() {
    super(UserProfileEntity);
  }
}
