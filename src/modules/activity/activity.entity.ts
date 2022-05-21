import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseCollection } from "../../common/entities";
import { ActivityType } from "../../common/enums";
import { ActivityProgress } from "../activity-progress";
import { CourseEntity } from "../course";

@Entity("activity")
export class Activity extends BaseCollection {
  @Column({ name: "title", type: "varchar", length: 255 })
  title: string;

  @Column({ name: "description", type: "varchar" })
  description: string;

  @Column({ name: "link", type: "varchar", length: 255 })
  link: string;

  @Column({ type: "enum", enum: ActivityType, default: ActivityType.VIDEO })
  type: ActivityType;

  @ManyToOne(() => CourseEntity, (course) => course.activities)
  course: CourseEntity;

  @OneToMany(
    () => ActivityProgress,
    (activityProgress) => activityProgress.activity
  )
  activityProgress: ActivityProgress[];
}
