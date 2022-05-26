import { dataSource } from "../../config/database";
import { UserController } from "../../modules/user";

dataSource.initialize();

const controller = new UserController();

export const createUser = controller.createUser.bind(controller);
export const getUserByCognitoId =
  controller.getUserByCognitoId.bind(controller);
