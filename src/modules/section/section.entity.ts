import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseCollection } from "../../common/entities";
import { ActivityEntity } from "../activity";
import { CourseEntity } from "../course";

@Entity("section")
export class SectionEntity extends BaseCollection {
  @Column({ name: "title", type: "varchar", length: 255 })
  title!: string;

  @Column({ name: "description", type: "varchar", length: 500 })
  description!: string;

  @ManyToOne((type) => CourseEntity, (course) => course.sections)
  course!: CourseEntity;

  @OneToMany((type) => ActivityEntity, (activity) => activity.section)
  activities!: ActivityEntity[];
}
