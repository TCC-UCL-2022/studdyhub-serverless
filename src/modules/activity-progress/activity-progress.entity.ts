import { Column, Entity, OneToOne } from "typeorm";
import { BaseCollection } from "../../common/entities";
import { Activity } from "../activity/activity.entity";
import { Student } from "../student";

@Entity("activity-progress")
export class ActivityProgress extends BaseCollection {
  @Column({ name: "progress", type: "integer", default: 0 })
  progress: number;

  @Column({ name: "completed", type: "boolean", default: false })
  completed: boolean;

  @OneToOne(() => Activity, (activity) => activity.activityProgress)
  activity: Activity;

  @OneToOne(() => Student, (student) => student.activityProgress)
  student: Student;
}
