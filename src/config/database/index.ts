import * as dynamoose from "dynamoose";
import { environments } from "../environment";

export const setupDynamo = () => {
  // const ddb = new dynamoose.aws.sdk.DynamoDB();

  // if (environments.NODE_ENV === "production") {
  //   dynamoose.aws.ddb.set(ddb);
  //   return;
  // }

  dynamoose.aws.ddb.local(environments.DB_URL);
};
