import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base";

@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  hash_password: string;
}
