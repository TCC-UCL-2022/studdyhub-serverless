import { Entity, OneToMany } from "typeorm";
import { UserBaseEntity } from "../../common/entities";
import { CourseEntity } from "../course";

@Entity("teacher")
export class TeacherEntity extends UserBaseEntity {
  @OneToMany(() => CourseEntity, (course) => course.teacher)
  courses: CourseEntity[];
}
