import { BaseModel } from "../../../common/models/base.model";
import { UserProfileEntity } from "../../../core/db/entities/user-profile";
import { UserVideoEntity } from "../../../core/db/entities/user-video";
import { UserModel } from "../../user/models/user.model";

export class UserVideoModel extends BaseModel {
  title: string;
  description: string;
  link: string;
  numberOfLike: number;
  numberOfDislike: number;
  user: UserProfileEntity;
  isLiked: boolean;
  isDisliked: boolean;

  constructor(user?: Partial<UserVideoModel>) {
    super(user);
    Object.assign(this, user);
  }

  mappingToDao(): UserVideoEntity {
    return {
      title: this.title,
      description: this.description,
      link: this.link,
      number_of_like: this.numberOfLike,
      number_of_dislike: this.numberOfDislike,
      user: this.user,
    };
  }

  static mappingToDomain(
    entity: UserVideoEntity,
    isLiked: boolean = false,
    isDisliked: boolean = false
  ) {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      link: entity.link,
      numberOfLike: entity.number_of_like,
      numberOfDislike: entity.number_of_dislike,
      user: UserModel.mappingToDomain(entity.user),
      isLiked,
      isDisliked,
    };
  }
}
