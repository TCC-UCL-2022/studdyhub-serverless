import * as dynamoose from "dynamoose";
import { Roles } from "../common/enums";
import { BaseModel } from "../common/model/base-model";

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
      required: true,
    },
    cognitoId: {
      type: String,
      required: true,
      index: {
        global: true,
        name: "CognitoIdIndex",
      },
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      rangeKey: true,
      validate: /.+@.+/gu,
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

export const UserModel = dynamoose.model<User>("usertable", schema, {
  create: true,
  update: true,
  throughput: {
    read: 5,
    write: 5,
  },
});
