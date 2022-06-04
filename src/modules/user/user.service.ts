import { NotFoundError } from "../../common/errors";
import { User } from "../../entities";
import { DatabaseService } from "../database";
import { CreateUserDto } from "./dto";

export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async getUserByCognitoId(cognitoId: string): Promise<User> {
    const userRepository = await this.databaseService.getEntityRepository(User);

    const user = await userRepository.findOne({
      where: {
        cognitoId,
        active: true,
      },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    await this.databaseService.closeDatabaseConnection();

    return user;
  }

  public async getUserById(id: string): Promise<User> {
    const userRepository = await this.databaseService.getEntityRepository(User);

    const user = await userRepository.findOne({
      where: {
        id,
        active: true,
      },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    await this.databaseService.closeDatabaseConnection();

    return user;
  }

  public async createUser(payload: CreateUserDto): Promise<User> {
    const userRepository = await this.databaseService.getEntityRepository(User);

    const user = await userRepository.create(payload).save();

    await this.databaseService.closeDatabaseConnection();

    return user;
  }

  public async updateUser(id: string, user: Partial<User>): Promise<User> {
    const userRepository = await this.databaseService.getEntityRepository(User);

    const existingUser = await userRepository.findOne({
      where: {
        id,
        active: true,
      },
    });

    if (!existingUser) {
      throw new NotFoundError("User not found");
    }

    const updated = await userRepository.save({
      ...existingUser,
      ...user,
    });

    await this.databaseService.closeDatabaseConnection();

    return updated;
  }
}
