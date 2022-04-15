import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseCollection } from "../../common/entities";
import { ActivityType } from "../../common/enums";
import { ActivityCompletedEntity } from "../activity-completed";
import { SectionEntity } from "../section";

@Entity("activity")
export class ActivityEntity extends BaseCollection {
  @Column({ name: "title", type: "varchar", length: 255 })
  title!: string;

  @Column({ name: "description", type: "varchar" })
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
