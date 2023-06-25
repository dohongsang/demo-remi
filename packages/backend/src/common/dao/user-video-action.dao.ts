import { Service } from "typedi";
import { UserVideoActionEntity } from "../../core/db/entities/user-video-action";
import { Dao } from "../../core/db/repo";

@Service()
export class UserVideoActionDao extends Dao {
  constructor() {
    super(UserVideoActionEntity);
  }
}
