import container from "../../container";
import { UserController } from "../../modules/user";

const userController = container.resolve(UserController);

export const { createUser, getUserByCognitoId } = userController;
