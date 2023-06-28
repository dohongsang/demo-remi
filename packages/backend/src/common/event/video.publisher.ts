import events from "events";
import { Service } from "typedi";
import { UserVideoModel } from "../../modules/video/models/user-video.model";

export enum ACCOUNT_PUBLISHER_ACTION {
  NEW_SHARE_VIDEO = "NEW_SHARE_VIDEO",
}

@Service()
export class NotifyNewVideoPublisher extends events.EventEmitter {
  constructor() {
    super();
  }

  async notifyNewVideo(message: UserVideoModel) {
    await this.emit(ACCOUNT_PUBLISHER_ACTION.NEW_SHARE_VIDEO, message);
  }

  onMessageNotifyNewVideo(cb: (message: UserVideoModel) => void) {
    this.addListener(
      ACCOUNT_PUBLISHER_ACTION.NEW_SHARE_VIDEO,
      (message: UserVideoModel) => {
        console.log({ NotifyNewVideoPublisher: message });
        cb(message);
      }
    );
  }
}
