import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  created_at: string;

  @Column()
  created_by: string;

  @Column()
  updated_at: string;

  @Column()
  updated_by: string;
}
