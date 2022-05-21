import { Handler } from "aws-lambda";
import { HandlerEvent } from "../../common/types";
import { MessageUtil } from "../../common/utils";
import { CreateUserDto } from "./dto";
import { UserService } from "./user.service";

export class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getUserById: Handler<HandlerEvent<{ id: string }>> = async (event) => {
    try {
      const { id } = event.pathParameters;

      const user = await this.userService.getUserById(id);

      return MessageUtil.success(user);
    } catch (err) {
      return MessageUtil.error(err);
    }
  };

  createUser: Handler<HandlerEvent> = async (event) => {
    try {
      const payload: CreateUserDto = JSON.parse(event.body);

      const user = await this.userService.createUser(payload);

      return MessageUtil.success(user);
    } catch (err) {
      return MessageUtil.error(err);
    }
  };
}
