import { Entity, ManyToOne } from "typeorm";
import { BaseCollection } from "../common/entities";
import { Course } from "./course";
import { User } from "./user";

@Entity("enrollment")
export class Enrollment extends BaseCollection {
  @ManyToOne(() => User, (user) => user.enrollments, { nullable: false })
  user: User;

  @ManyToOne(() => Course, (course) => course.enrollments, { nullable: false })
  course: Course;
}
