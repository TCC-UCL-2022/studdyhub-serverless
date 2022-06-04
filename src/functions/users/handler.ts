import { UserController } from "../../modules/user";

const controller = new UserController();

export const createUser = controller.createUser.bind(controller);
export const getUserByCognitoId =
  controller.getUserByCognitoId.bind(controller);
