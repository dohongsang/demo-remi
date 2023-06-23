import { EventEmitter } from "events";
import { Service } from "typedi";
import { UserModel } from "../../models/user.model";

export enum ACCOUNT_PUBLISHER_ACTION {
  NEW_ACCOUNT_CREATED = "NEW_ACCOUNT_CREATED",
}

@Service()
export class UserSubcriber extends EventEmitter.EventEmitter {
  constructor() {
    super();
  }

  onAccountCreated(cb: (payload: UserModel) => void) {
    this.on(ACCOUNT_PUBLISHER_ACTION.NEW_ACCOUNT_CREATED, cb);
  }
}
