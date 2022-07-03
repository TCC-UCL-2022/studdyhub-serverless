import * as dynamoose from "dynamoose";
import { ActivityType } from "../common/enums";
import { BaseModel } from "../common/model/base-model";
import { User, UserModel } from "./user";

export interface Activity {
  id: string;
  title: string;
  description?: string;
  content: string;
  type: ActivityType;
}
export class Course extends BaseModel {
  title: string;
  description: string;
  published: boolean;
  activities: Activity[];
  user: User;
}

const Activityschema = new dynamoose.Schema({
  id: {
    type: String,
    required: true,
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
});

const schema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    published: {
      type: Boolean,
      default: false,
    },
    activities: {
      type: Array,
      default: [],
      schema: [Activityschema],
    },
    user: {
      type: UserModel,
      required: true,
      index: {
        name: "user-index",
      },
    },
  },
  {
    timestamps: true,
  }
);

export const CourseModel = dynamoose.model<Course>("course", schema);
