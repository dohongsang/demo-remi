import { BaseModel } from "../../../common/models/base.model";
import { UserVideoActionEntity } from "../../../core/db/entities/user-video-action";
import { UserModel } from "../../user/models/user.model";
import { UserVideoModel } from "./user-video.model";

export class UserVideoActionModel extends BaseModel {
  isLiked: boolean;
  isDisliked: boolean;
  profile: UserModel;
  userVideo: UserVideoModel;

  constructor(user?: Partial<UserVideoActionModel>) {
    super(user);
    Object.assign(this, user);
  }

  mappingToDao() {
    return {
      is_liked: this.isLiked,
      is_disliked: this.isDisliked,
    };
  }

  mappingToDomain(entity: UserVideoActionEntity) {
    return {
      isLiked: entity.is_liked,
      isDisliked: entity.is_disliked,
      profile: entity.profile,
      userVideo: entity.video,
    };
  }
}
