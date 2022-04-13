import { ActivityType } from "src/common/enums";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { ActivityCompletedEntity } from "src/modules/activity-completed";
import { BaseCollection } from "src/common/base-entities";
import { SectionEntity } from "src/modules/section";

@Entity("activity")
export class ActivityEntity extends BaseCollection {
  @Column({ name: "title", type: "varchar", length: 255 })
  title!: string;

  @Column({ name: "description", type: "varchar", length: 500 })
  description!: string;

  @Column({ name: "url", type: "varchar", length: 255 })
  url!: string;

  @Column({ type: "enum", enum: ActivityType, default: ActivityType.VIDEO })
  type!: ActivityType;

  @ManyToOne((type) => SectionEntity, (section) => section.activities)
  section!: SectionEntity;

  @OneToMany(
    (type) => ActivityCompletedEntity,
    (activityCompleted) => activityCompleted.activity
  )
  completed!: ActivityCompletedEntity[];
}
