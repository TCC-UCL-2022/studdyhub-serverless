import { Entity, OneToMany } from "typeorm";
import { UserBaseEntity } from "src/common/base-entities";
import { CourseEntity } from "src/modules/course";

@Entity("teacher")
export class TeacherEntity extends UserBaseEntity {
  @OneToMany((type) => CourseEntity, (course) => course.teacher)
  courses!: CourseEntity[];
}
