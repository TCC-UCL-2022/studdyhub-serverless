import { ActivityType } from "../../../common/enums";

export interface CreateActivityDto {
  title: string;
  description?: string;
  content: string;
  type: ActivityType;
}
