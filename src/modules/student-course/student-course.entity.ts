import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { ActivityCompletedEntity } from "src/modules/activity-completed";
import { BaseCollection } from "src/common/base-entities";
import { CourseEntity } from "src/modules/course";
import { StudentEntity } from "src/modules/student";

@Entity("student_course")
export class StudentCourseEntity extends BaseCollection {
  @Column({
    name: "started_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  startedAt!: Date;

  @ManyToOne((type) => StudentEntity, (student) => student.courses)
  student!: StudentEntity;

  @ManyToOne((type) => CourseEntity, (course) => course.students)
  course!: CourseEntity;

  @OneToMany(
    (type) => ActivityCompletedEntity,
    (activityCompleted) => activityCompleted.studentCourse
  )
  activitiesCompleted!: ActivityCompletedEntity[];
}
