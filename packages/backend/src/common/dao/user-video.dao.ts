import { Service } from "typedi";
import { UserVideoEntity } from "../../core/db/entities/user-video";
import { Dao } from "../../core/db/repo";

@Service()
export class UserVideoDao extends Dao {
  constructor() {
    super(UserVideoEntity);
  }
}
