import { Entity, OneToMany } from "typeorm";
import { UserBaseEntity } from "../../common/entities";
import { StudentCourseEntity } from "../student-course";

@Entity("student")
export class StudentEntity extends UserBaseEntity {
  @OneToMany(
    (type) => StudentCourseEntity,
    (studentCourse) => studentCourse.student
  )
  courses!: StudentCourseEntity[];
}
