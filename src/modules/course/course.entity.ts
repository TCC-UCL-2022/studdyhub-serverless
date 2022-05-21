import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseCollection } from "../../common/entities";
import { Activity } from "../activity";
import { Enrollment } from "../enrollment";
import { TeacherEntity } from "../teacher";

@Entity("course")
export class CourseEntity extends BaseCollection {
  @Column({ name: "title", type: "varchar", length: 255 })
  title: string;

  @Column({ name: "description", type: "varchar" })
  description: string;

  @Column({ name: "published", type: "boolean", default: false })
  published: boolean;

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.courses, {
    nullable: false,
  })
  teacher: TeacherEntity;

  @OneToMany(() => Activity, (activity) => activity.course)
  activities: Activity[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];
}
