import { Handler } from "aws-lambda";
import { injectable } from "inversify";
import { HandlerEvent } from "../../common/types";
import { Logger, MessageUtil } from "../../common/utils";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { UserService } from "./user.service";

@injectable()
export class UserController {
  private readonly logger: Logger;

  constructor(private readonly userService: UserService) {
    this.logger = Logger.createLogger("UserController");
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

  updateUser: Handler<HandlerEvent<{ id: string }>> = async (event) => {
    this.logger.debug("[updateUser] invoked");

    try {
      const { id } = event.pathParameters;
      const payload: UpdateUserDto = JSON.parse(event.body);

      const user = await this.userService.updateUser(id, payload);

      this.logger.debug("[updateUser] updated user:", user.id);

      return MessageUtil.success(user);
    } catch (err) {
      this.logger.error("[updateUser] failed:", err);

      return MessageUtil.error(err);
    }
  };

  deleteUser: Handler<HandlerEvent<{ id: string }>> = async (event) => {
    this.logger.debug("[deleteUser] invoked");

    try {
      const { id } = event.pathParameters;

      const user = await this.userService.deleteUser(id);

      this.logger.debug("[deleteUser] deleted course:", user.id);

      return MessageUtil.success(user);
    } catch (err) {
      this.logger.error("[deleteUser] failed:", err);

      return MessageUtil.error(err);
    }
  };
}
