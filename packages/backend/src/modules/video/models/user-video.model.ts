import { BaseModel } from "../../../common/models/base.model";
import { UserVideoEntity } from "../../../core/db/entities/user-video";

export class UserVideoModel extends BaseModel {
  title: string;
  description: string;
  numberOfLike: number;
  numberOfDislike: number;

  constructor(user?: Partial<UserVideoModel>) {
    super(user);
    Object.assign(this, user);
  }

  mappingToDao() {
    return {
      title: this.title,
      description: this.description,
    };
  }

  mappingToDomain(entity: UserVideoEntity) {
    return {
      title: entity.title,
      description: entity.description,
      numberOfLike: entity.number_of_like,
      numberOfDislike: entity.number_of_dislike,
    };
  }
}
