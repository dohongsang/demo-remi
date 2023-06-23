import EventEmitter from "events";
import { Service } from "typedi";
import { UserModel } from "../../models/user.model";

export enum ACCOUNT_PUBLISHER_ACTION {
  NEW_ACCOUNT_CREATED = "NEW_ACCOUNT_CREATED",
}

@Service()
export class AccountPublisher extends EventEmitter {
  constructor() {
    super();
  }

  async accountCreated(payload: UserModel) {
    await this.emit(ACCOUNT_PUBLISHER_ACTION.NEW_ACCOUNT_CREATED, payload);
  }

  onAccountCreated(cb: (payload: UserModel) => void) {
    this.on(ACCOUNT_PUBLISHER_ACTION.NEW_ACCOUNT_CREATED, () => {
      console.log(ACCOUNT_PUBLISHER_ACTION.NEW_ACCOUNT_CREATED);
    });
  }
}
