import * as dynamoose from "dynamoose";
import { Roles } from "../common/enums";
import { BaseModel } from "../common/model/base-model";
import { generateUuid } from "../common/utils";

export class User extends BaseModel {
  cognitoId: string;
  name: string;
  email: string;
  role: Roles;
}

const schema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: generateUuid(),
      forceDefault: true,
    },
    cognitoId: {
      type: String,
      required: true,
      index: {
        name: "cognitoId-index",
      },
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Roles),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = dynamoose.model<User>("user", schema);
