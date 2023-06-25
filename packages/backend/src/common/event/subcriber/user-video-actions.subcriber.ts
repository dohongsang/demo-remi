import events from "events";
import { Service } from "typedi";

export enum ACCOUNT_PUBLISHER_ACTION {
  NEW_LIKE_VIDEO = "NEW_LIKE_VIDEO",
  NEW_DISLIKE_VIDEO = "NEW_DISLIKE_VIDEO",
  UN_LIKE_VIDEO = "UN_LIKE_VIDEO",
  UN_DISLIKE_VIDEO = "UN_DISLIKE_VIDEO",
}

@Service()
export class UserVideoActionSubcriber extends events.EventEmitter {
  constructor() {
    super();
  }

  onMessageUserDislikeVideo(cb: (message: { id: string }) => void) {
    this.addListener(
      ACCOUNT_PUBLISHER_ACTION.NEW_DISLIKE_VIDEO,
      (message: { id: string }) => {
        cb(message);
        this.removeAllListeners();
      }
    );
  }

  onMessageUserLikeVideo(cb: (message: { id: string }) => void) {
    this.addListener(
      ACCOUNT_PUBLISHER_ACTION.NEW_LIKE_VIDEO,
      (message: { id: string }) => {
        cb(message);
        this.removeAllListeners();
      }
    );
  }

  onMessageUserUnDislikeVideo(cb: (message: { id: string }) => void) {
    this.addListener(
      ACCOUNT_PUBLISHER_ACTION.UN_DISLIKE_VIDEO,
      (message: { id: string }) => {
        cb(message);
        this.removeAllListeners();
      }
    );
  }

  onMessageUserUnLikeVideo(cb: (message: { id: string }) => void) {
    this.addListener(
      ACCOUNT_PUBLISHER_ACTION.UN_LIKE_VIDEO,
      (message: { id: string }) => {
        cb(message);
        this.removeAllListeners();
      }
    );
  }
}
