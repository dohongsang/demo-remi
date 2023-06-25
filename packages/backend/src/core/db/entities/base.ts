import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "timestamp", nullable: true })
  created_at?: string;

  @Column({ type: "text", nullable: true })
  created_by?: string;

  @Column({ type: "timestamp", nullable: true })
  updated_at?: string;

  @Column({ type: "text", nullable: true })
  updated_by?: string;
}
