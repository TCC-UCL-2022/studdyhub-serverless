import { Column, Entity, ManyToOne } from "typeorm";
import { BaseCollection } from "../../common/entities";
import { Activity } from "../activity/activity.entity";
import { User } from "../user";

@Entity("activity-progress")
export class ActivityProgress extends BaseCollection {
  @Column({ name: "progress", type: "integer", default: 0 })
  progress: number;

  @Column({ name: "completed", type: "boolean", default: false })
  completed: boolean;

  @ManyToOne(() => Activity, (activity) => activity.activityProgress, {
    nullable: false,
  })
  activity: Activity;

  @ManyToOne(() => User, (user) => user.activityProgress, { nullable: false })
  user: User;
}
