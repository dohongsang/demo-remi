import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base";

@Entity({ name: "user_profiles" })
export class UserProfileEntity extends BaseEntity {
  @Column({ type: "text", nullable: true })
  first_name: string;

  @Column({ type: "text", nullable: true })
  last_name: string;

  @Column({ type: "text", nullable: true })
  email: string;
}
