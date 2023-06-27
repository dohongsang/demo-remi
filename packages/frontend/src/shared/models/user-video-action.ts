import BaseModel from "../../core/models/base";

export default class UserVideoAction extends BaseModel {
  isLiked!: boolean;
  isDislike!: boolean;

  constructor(init: Partial<UserVideoAction>) {
    super(init);
    Object.assign(this, init);
  }
}
