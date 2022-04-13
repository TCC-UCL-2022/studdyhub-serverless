import { Column } from "typeorm";
import { BaseCollection } from "./base-collection.entity";

export class UserBaseEntity extends BaseCollection {
  @Column({ name: "name", type: "varchar", length: 255 })
  name!: string;

  @Column({ name: "email", type: "varchar", length: 255 })
  email!: string;

  @Column({ name: "active", type: "boolean", default: false })
  active!: boolean;
}
