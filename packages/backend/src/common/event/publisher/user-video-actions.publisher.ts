import events from "events";
import { Service } from "typedi";

export enum ACCOUNT_PUBLISHER_ACTION {
  NEW_LIKE_VIDEO = "NEW_LIKE_VIDEO",
  NEW_DISLIKE_VIDEO = "NEW_DISLIKE_VIDEO",
  UN_LIKE_VIDEO = "UN_LIKE_VIDEO",
  UN_DISLIKE_VIDEO = "UN_DISLIKE_VIDEO",
}

@Service()
export class UserVideoActionPublisher extends events.EventEmitter {
  constructor() {
    super();
  }

  async notifyUserLikeVideo(message: { id: string }) {
    await this.emit(ACCOUNT_PUBLISHER_ACTION.NEW_LIKE_VIDEO, message);
  }

  async notifyUserDislikeVideo(message: { id: string }) {
    await this.emit(ACCOUNT_PUBLISHER_ACTION.NEW_DISLIKE_VIDEO, message);
  }

  async notifyUserUnLikeVideo(message: { id: string }) {
    await this.emit(ACCOUNT_PUBLISHER_ACTION.UN_LIKE_VIDEO, message);
  }

  async notifyUserUnDislikeVideo(message: { id: string }) {
    await this.emit(ACCOUNT_PUBLISHER_ACTION.UN_DISLIKE_VIDEO, message);
  }

  onMessageUserDislikeVideo(cb: (message: { id: string }) => void) {
    this.addListener(
      ACCOUNT_PUBLISHER_ACTION.NEW_DISLIKE_VIDEO,
      (message: { id: string }) => {
        cb(message);
      }
    );
  }

  onMessageUserLikeVideo(cb: (message: { id: string }) => void) {
    this.addListener(
      ACCOUNT_PUBLISHER_ACTION.NEW_LIKE_VIDEO,
      (message: { id: string }) => {
        cb(message);
      }
    );
  }

  onMessageUserUnDislikeVideo(cb: (message: { id: string }) => void) {
    this.addListener(
      ACCOUNT_PUBLISHER_ACTION.UN_DISLIKE_VIDEO,
      (message: { id: string }) => {
        cb(message);
      }
    );
  }

  onMessageUserUnLikeVideo(cb: (message: { id: string }) => void) {
    this.addListener(
      ACCOUNT_PUBLISHER_ACTION.UN_LIKE_VIDEO,
      (message: { id: string }) => {
        cb(message);
      }
    );
  }
}
