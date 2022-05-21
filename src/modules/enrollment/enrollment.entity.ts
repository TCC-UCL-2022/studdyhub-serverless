import { Entity, ManyToOne } from "typeorm";
import { BaseCollection } from "../../common/entities";
import { Course } from "../course";
import { Student } from "../student";

@Entity("student_course")
export class Enrollment extends BaseCollection {
  @ManyToOne(() => Student, (student) => student.enrollments)
  student: Student;

  @ManyToOne(() => Course, (course) => course.enrollments)
  course: Course;
}
