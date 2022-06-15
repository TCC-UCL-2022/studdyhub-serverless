import * as dynamoose from "dynamoose";
import { BaseModel } from "../common/model/base-model";
import { generateUuid } from "../common/utils";
import { Activity, ActivityModel } from "./activity";
import { User, UserModel } from "./user";

export class Course extends BaseModel {
  title: string;
  description: string;
  published: boolean;
  activities: Activity[];
  user: User;
}

const schema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      required: true,
      default: generateUuid(),
    },
    title: {
      type: String,
      required: true,
      index: {
        name: "title-index",
      },
    },
    description: {
      type: String,
      index: {
        name: "description-index",
      },
    },
    published: {
      type: Boolean,
      default: false,
    },
    activities: {
      type: Array,
      default: [],
      schema: [ActivityModel],
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
