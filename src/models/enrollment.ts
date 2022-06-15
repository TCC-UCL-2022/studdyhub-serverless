import * as dynamoose from "dynamoose";
import { BaseModel } from "../common/model/base-model";
import { generateUuid } from "../common/utils";
import { Course, CourseModel } from "./course";
import { User, UserModel } from "./user";

export class Enrollment extends BaseModel {
  course: Course;
  user: User;
}

const schema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: generateUuid(),
      forceDefault: true,
    },
    course: {
      type: CourseModel,
      required: true,
      index: {
        name: "enrollment-course-index",
      },
    },
    user: {
      type: UserModel,
      required: true,
      index: {
        name: "enrollment-user-index",
      },
    },
  },
  {
    timestamps: true,
  }
);

export const EnrollmentModel = dynamoose.model<Enrollment>(
  "enrollment",
  schema
);
