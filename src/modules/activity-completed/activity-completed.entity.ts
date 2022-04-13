import { Column, Entity, ManyToOne } from "typeorm";
import { ActivityEntity } from "src/modules/activity";
import { BaseCollection } from "src/common/base-entities";
import { StudentCourseEntity } from "src/modules/student-course";

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
