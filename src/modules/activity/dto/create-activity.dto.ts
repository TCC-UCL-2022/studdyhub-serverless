import { ActivityType } from "../../../common/enums";

export interface CreateActivityDto {
  courseId: string;
  title: string;
  description?: string;
  content: string;
  type: ActivityType;
}
