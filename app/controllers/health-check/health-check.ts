import { Handler } from "aws-lambda";
import { MessageUtil } from "../../utils/message";

export class HealthCheck {
  get: Handler = (event, context) => {
    return Promise.resolve(MessageUtil.success(event));
  };
}
