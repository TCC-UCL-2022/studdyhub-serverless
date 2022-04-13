import { Handler } from "aws-lambda";
import { MessageUtil } from "../../utils/message";

export class HealthCheck {
  get: Handler = (_event, _context) => {
    return Promise.resolve(MessageUtil.success("ok"));
  };
}
