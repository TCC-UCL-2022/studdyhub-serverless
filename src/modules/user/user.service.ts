import { v4 as uuidV4 } from "uuid";
import { ConflictError, NotFoundError } from "../../common/errors";
import { User, UserModel } from "../../models";
import { CreateUserDto, UpdateUserDto } from "./dto";

export class UserService {
  constructor(private readonly userModel: typeof UserModel) {}

  public async getUserByCognitoId(cognitoId: string): Promise<User> {
    const result = await UserModel.query("cognitoId")
      .eq(cognitoId)
      .using("CognitoIdIndex")
      .exec();

    if (!result.length) {
      throw new NotFoundError("User not found");
    }

    return result[0];
  }

  public async getUserById(id: string): Promise<User> {
    const user = await UserModel.get({
      id,
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
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
      .using("CognitoIdIndex")
      .exec();

    if (existingUser.length > 0) {
      throw new ConflictError("User already exists");
    }

    const user = await this.userModel.create({
      id: uuidV4(),
      cognitoId,
      email,
      name,
      role,
    });

    return user;
  }

  public async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const updated = await this.userModel.update({ id }, { ...data });

    return updated;
  }
}
