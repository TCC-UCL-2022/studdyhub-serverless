import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseCollection } from "../../common/entities";
import { Activity } from "../activity";
import { Enrollment } from "../enrollment";
import { Teacher } from "../teacher";

@Entity("course")
export class Course extends BaseCollection {
  @Column({ name: "title", type: "varchar", length: 255 })
  title: string;

  @Column({ name: "description", type: "varchar" })
  description: string;

  @Column({ name: "published", type: "boolean", default: false })
  published: boolean;

  @ManyToOne(() => Teacher, (teacher) => teacher.courses, {
    nullable: false,
  })
  teacher: Teacher;

  @OneToMany(() => Activity, (activity) => activity.course)
  activities: Activity[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];
}
