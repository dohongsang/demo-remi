import BaseModel from "../../core/models/base";
import UserInfo from "../../core/models/user-info";

export default class UserVideo extends BaseModel {
  title!: string;
  description!: string;
  link!: string;
  numberOfLike!: string;
  numberOfDislike!: string;
  user!: UserInfo;
  isLiked!: boolean;
  isDisliked!: boolean;

  constructor(init: Partial<UserVideo>) {
    super(init);
    Object.assign(this, init);
  }
}
