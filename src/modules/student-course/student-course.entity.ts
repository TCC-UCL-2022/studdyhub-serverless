import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseCollection } from "../../common/entities";
import { ActivityCompletedEntity } from "../activity-completed";
import { CourseEntity } from "../course";
import { StudentEntity } from "../student";

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
