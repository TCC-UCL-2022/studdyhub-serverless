import { Entity, OneToMany } from "typeorm";
import { UserBaseEntity } from "../../common/base-entities";
import { CourseEntity } from "../course";

@Entity("teacher")
export class TeacherEntity extends UserBaseEntity {
  @OneToMany((type) => CourseEntity, (course) => course.teacher)
  courses!: CourseEntity[];
}
