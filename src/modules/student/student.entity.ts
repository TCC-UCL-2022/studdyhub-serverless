import { Entity, OneToMany } from "typeorm";
import { UserBaseEntity } from "src/common/base-entities";
import { StudentCourseEntity } from "src/modules/student-course";

@Entity("student")
export class StudentEntity extends UserBaseEntity {
  @OneToMany(
    (type) => StudentCourseEntity,
    (studentCourse) => studentCourse.student
  )
  courses!: StudentCourseEntity[];
}
