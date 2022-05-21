import { Repository } from "typeorm";
import { NotFoundError } from "../../common/errors";
import { BaseService } from "../../common/services";
import { dataSource } from "../../config/database";
import { CreateUserDto } from "./dto";
import { User } from "./user.entity";

export class UserService extends BaseService {
  userRepository: Repository<User>;

  constructor() {
    super();
    this.userRepository = dataSource.getRepository(User);
  }

  public async getUserById(id: string): Promise<User> {
    await this.loadDatabase();

    const user = await this.userRepository.findOne({
      where: {
        id,
        active: true,
      },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  public async createUser(user: CreateUserDto): Promise<User> {
    await this.loadDatabase();

    return await this.userRepository.save(user);
  }

  public async updateUser(id: string, user: Partial<User>): Promise<User> {
    await this.loadDatabase();

    const existingUser = await this.userRepository.findOne({
      where: {
        id,
        active: true,
      },
    });

    if (!existingUser) {
      throw new NotFoundError("User not found");
    }

    return await this.userRepository.save({
      ...existingUser,
      ...user,
    });
  }
}
