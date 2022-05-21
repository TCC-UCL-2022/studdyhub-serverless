import { Entity, OneToMany } from "typeorm";
import { UserBaseEntity } from "../../common/entities";
import { Course } from "../course";

@Entity("teacher")
export class Teacher extends UserBaseEntity {
  @OneToMany(() => Course, (course) => course.teacher)
  courses: Course[];
}
