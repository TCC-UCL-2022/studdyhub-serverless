import { Column, Entity, ManyToOne } from "typeorm";
import { BaseCollection } from "../../common/entities";
import { ActivityEntity } from "../activity";
import { StudentCourseEntity } from "../student-course";

@Entity("activity_completed")
export class ActivityCompletedEntity extends BaseCollection {
  @Column({
    name: "completed_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  completedAt!: Date;

  @ManyToOne((type) => ActivityEntity, (activity) => activity.completed)
  activity!: ActivityEntity;

  @ManyToOne(
    (type) => StudentCourseEntity,
    (studentCourse) => studentCourse.activitiesCompleted
  )
  studentCourse!: StudentCourseEntity;
}
