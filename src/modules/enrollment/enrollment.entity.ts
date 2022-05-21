import { Entity, ManyToOne } from "typeorm";
import { BaseCollection } from "../../common/entities";
import { CourseEntity } from "../course";
import { Student } from "../student";

@Entity("student_course")
export class Enrollment extends BaseCollection {
  @ManyToOne(() => Student, (student) => student.enrollments)
  student: Student;

  @ManyToOne(() => CourseEntity, (course) => course.enrollments)
  course: CourseEntity;
}
