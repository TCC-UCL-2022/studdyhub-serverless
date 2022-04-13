import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export class BaseCollection extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ name: "active", type: "boolean", default: true })
  active!: boolean;

  @Column({ name: "deleted", type: "boolean", default: false })
  deleted!: boolean;
}
