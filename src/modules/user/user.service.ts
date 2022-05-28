import { NotFoundError } from "../../common/errors";
import { BaseService } from "../../common/services";
import { CreateUserDto } from "./dto";
import { User } from "./user.entity";

export class UserService extends BaseService {
  public async getUserByCognitoId(cognitoId: string): Promise<User> {
    const userRepository = await this.getEntityRepository(User);

    const user = await userRepository.findOne({
      where: {
        cognitoId,
        active: true,
      },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  public async createUser(user: CreateUserDto): Promise<User> {
    const userRepository = await this.getEntityRepository(User);

    return await userRepository.save(user);
  }

  public async updateUser(id: string, user: Partial<User>): Promise<User> {
    const userRepository = await this.getEntityRepository(User);

    const existingUser = await userRepository.findOne({
      where: {
        id,
        active: true,
      },
    });

    if (!existingUser) {
      throw new NotFoundError("User not found");
    }

    return await userRepository.save({
      ...existingUser,
      ...user,
    });
  }
}
