import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base";

@Entity({ name: "user_videos" })
export class UserVideoEntity extends BaseEntity {
  @Column({ type: "text", nullable: true })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "text", nullable: true })
  number_of_like: string;

  @Column({ type: "text", nullable: true })
  number_of_dislike: string;
}
