import { Handler } from "aws-lambda";
import { HandlerEvent } from "../../common/types";
import { Logger, MessageUtil } from "../../common/utils";
import { CreateUserDto } from "./dto";
import { UserService } from "./user.service";

export class UserController {
  private readonly logger: Logger;
  private readonly userService: UserService;

  constructor() {
    this.logger = Logger.createLogger("UserController");
    this.userService = new UserService();
  }

  getUserByCognitoId: Handler<HandlerEvent<{ id: string }>> = async (event) => {
    try {
      const { id } = event.pathParameters;

      this.logger.debug("[getUserByCognitoId] invoked for cognitoId:", id);

      const user = await this.userService.getUserByCognitoId(id);

      this.logger.debug("[getUserByCognitoId] found user:", user.id);

      return MessageUtil.success(user);
    } catch (err) {
      this.logger.error("[getUserByCognitoId] failed:", err);

      return MessageUtil.error(err);
    }
  };

  createUser: Handler<HandlerEvent> = async (event) => {
    this.logger.debug("[createUser] invoked");

    try {
      const payload: CreateUserDto = JSON.parse(event.body);

      const user = await this.userService.createUser(payload);

      this.logger.debug("[createUser] created user:", user.id);

      return MessageUtil.success(user);
    } catch (err) {
      this.logger.error("[createUser] failed:", err);

      return MessageUtil.error(err);
    }
  };
}
