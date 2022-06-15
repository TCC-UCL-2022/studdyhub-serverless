import * as dynamoose from "dynamoose";
import { ActivityType } from "../common/enums";
import { BaseModel } from "../common/model";
import { generateUuid } from "../common/utils";

export class Activity extends BaseModel {
  title: string;
  description: string;
  content: string;
  type: ActivityType;
}

const schema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: generateUuid(),
      forceDefault: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(ActivityType),
      default: ActivityType.VIDEO,
    },
  },
  {
    timestamps: true,
  }
);

export const ActivityModel = dynamoose.model<Activity>("activity", schema);
