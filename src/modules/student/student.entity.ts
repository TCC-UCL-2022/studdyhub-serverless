import { Entity, OneToMany } from "typeorm";
import { UserBaseEntity } from "../../common/entities";
import { ActivityProgress } from "../activity-progress";
import { Enrollment } from "../enrollment";

@Entity("student")
export class Student extends UserBaseEntity {
  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];

  @OneToMany(
    () => ActivityProgress,
    (activityProgress) => activityProgress.student
  )
  activityProgress: ActivityProgress[];
}
