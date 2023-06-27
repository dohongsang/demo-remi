import BaseModel from "../../core/models/base";

export default class UserVideo extends BaseModel {
  title!: string;
  description!: string;
  link!: string;
  numberOfLike!: string;
  numberOfDislike!: string;

  constructor(init: Partial<UserVideo>) {
    super(init);
    Object.assign(this, init);
  }
}
