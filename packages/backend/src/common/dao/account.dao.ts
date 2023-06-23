import { Service } from "typedi";
import { UserAccountEntity } from "../../core/db/entities/user-account";
import { Dao } from "../../core/db/repo";

@Service()
export class AccountDao extends Dao {
  constructor() {
    super(UserAccountEntity);
  }
}
