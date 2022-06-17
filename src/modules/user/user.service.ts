import { injectable } from "inversify";
import { ConflictError, NotFoundError } from "../../common/errors";
import { User, UserModel } from "../../models";
import { DatabaseService } from "../database";
import { CreateUserDto } from "./dto";

@injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {
    this.databaseService.initializeTableWihtoutCreating(UserModel);
  }

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
    const existingUser = await UserModel.query("cognitoId")
      .eq(cognitoId)
      .exec();

    if (existingUser.length > 0) {
      throw new ConflictError("User already exists");
    }

    const user = await UserModel.create({
      cognitoId,
      email,
      name,
      role,
    });

    return user;
  }
}
