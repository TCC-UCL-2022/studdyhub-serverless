import { Column, Entity, OneToMany } from "typeorm";
import { BaseCollection } from "../common/entities";
import { Roles } from "../common/enums";
import { ActivityProgress } from "./activity-progress";
import { Course } from "./course";
import { Enrollment } from "./enrollment";

@Entity("user")
export class User extends BaseCollection {
  @Column({ name: "cognitoId", unique: true, nullable: false })
  cognitoId: string;

  @Column({ name: "name", type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ name: "email", type: "varchar", length: 255, nullable: false })
  email: string;

  @Column({ name: "role", type: "enum", enum: Roles, nullable: false })
  role: Roles;

  @OneToMany(() => Course, (course) => course.user)
  courses: Course[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  enrollments: Enrollment[];

  @OneToMany(
    () => ActivityProgress,
    (activityProgress) => activityProgress.user
  )
  activityProgress: ActivityProgress[];
}
