import { BaseModel } from "../../../common/models/base.model";
import { UserVideoEntity } from "../../../core/db/entities/user-video";

export class UserVideoModel extends BaseModel {
  title: string;
  description: string;
  link: string;
  numberOfLike: number;
  numberOfDislike: number;

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
    };
  }

  static mappingToDomain(entity: UserVideoEntity) {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      link: entity.link,
      numberOfLike: entity.number_of_like,
      numberOfDislike: entity.number_of_dislike,
    };
  }
}
