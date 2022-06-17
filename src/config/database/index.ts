import * as dynamoose from "dynamoose";
import { environments } from "../environment";

export const setupDynamo = () => {
  if (environments.NODE_ENV === "production") {
    dynamoose.aws.ddb();
    return;
  }

  dynamoose.aws.ddb.local(environments.DB_URL);
};
