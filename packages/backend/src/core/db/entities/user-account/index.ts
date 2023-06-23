import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { UserProfileEntity } from "../user-profile";

@Entity({ name: "user_accounts" })
export class UserAccountEntity {
  @PrimaryColumn({ type: "text" })
  email: string;

  @Column({ type: "text", nullable: true })
  hash_key: string;

  @Column({ type: "text", nullable: true })
  hash_password: string;

  @OneToOne(() => UserProfileEntity)
  @JoinColumn()
  profile: UserProfileEntity;

  @Column({ type: "timestamp", nullable: true })
  created_at: string;

  @Column({ type: "text", nullable: true })
  created_by: string;

  @Column({ type: "timestamp", nullable: true })
  updated_at: string;

  @Column({ type: "text", nullable: true })
  updated_by: string;
}
