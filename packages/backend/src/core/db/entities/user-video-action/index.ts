import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../base";
import { UserProfileEntity } from "../user-profile";
import { UserVideoEntity } from "../user-video";

@Entity({ name: "user_video_actions" })
export class UserVideoActionEntity extends BaseEntity {
  @Column({ type: "bool", nullable: true })
  is_liked: boolean;

  @Column({ type: "bool", nullable: true })
  is_disliked: boolean;

  @OneToOne(() => UserProfileEntity)
  @JoinColumn()
  profile: UserProfileEntity;

  @OneToOne(() => UserVideoEntity)
  @JoinColumn()
  video: UserVideoEntity;
}
