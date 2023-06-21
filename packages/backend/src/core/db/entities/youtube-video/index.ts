import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base";

@Entity()
export class YoutubeVideo extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  link: string;

  @Column()
  number_of_like: string;

  @Column()
  number_of_dislike: string;
}
