import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { UserProfileEntity } from "../user-profile";
import { UserVideoEntity } from "../user-video";

@Entity({ name: "user_video_actions" })
export class UserVideoActionEntity {
  @PrimaryColumn("text")
  id?: string;

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

  @Column({ type: "timestamp", nullable: true })
  created_at?: string;

  @Column({ type: "text", nullable: true })
  created_by?: string;

  @Column({ type: "timestamp", nullable: true })
  updated_at?: string;

  @Column({ type: "text", nullable: true })
  updated_by?: string;
}
