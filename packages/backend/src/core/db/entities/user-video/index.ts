import { Column, Entity, Unique } from "typeorm";
import { BaseEntity } from "../base";

@Entity({ name: "user_videos" })
@Unique("unique_constraint_title", ["title"])
export class UserVideoEntity extends BaseEntity {
  @Column({ type: "text", nullable: true })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "text", nullable: true })
  link: string;

  @Column({ type: "int", nullable: true })
  number_of_like: number;

  @Column({ type: "int", nullable: true })
  number_of_dislike: number;
}
