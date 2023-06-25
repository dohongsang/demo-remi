import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../base";
import { UserProfileEntity } from "../user-profile";

@Entity({ name: "user_accounts" })
export class UserAccountEntity extends BaseEntity {
  @Column({ type: "text" })
  @Index()
  email: string;

  @Column({ type: "text", nullable: true })
  hash_key: string;

  @Column({ type: "text", nullable: true })
  hash_password: string;

  @OneToOne(() => UserProfileEntity)
  @JoinColumn()
  profile: UserProfileEntity;
}
