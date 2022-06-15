import { ConflictError, NotFoundError } from "../../common/errors";
import { User, UserModel } from "../../models";
import { CreateUserDto } from "./dto";

export class UserService {
  constructor(private readonly userModel: typeof UserModel) {}

  public async getUserByCognitoId(cognitoId: string): Promise<User> {
    const result = await UserModel.query("cognitoId").eq(cognitoId).exec();

    if (!result.length) {
      throw new NotFoundError("User not found");
    }

    return result[0];
  }

  public async getUserById(id: string): Promise<User> {
    const user = await UserModel.query({
      id,
    }).exec();

    if (!user.length) {
      throw new NotFoundError("User not found");
    }

    return user[0];
  }

  public async createUser({
    cognitoId,
    email,
    name,
    role,
  }: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel
      .query("cognitoId")
      .eq(cognitoId)
      .exec();

    if (existingUser.length > 0) {
      throw new ConflictError("User already exists");
    }

    const user = await this.userModel.create({
      cognitoId,
      email,
      name,
      role,
    });

    return user;
  }
}
