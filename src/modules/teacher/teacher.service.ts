import { Repository } from "typeorm";
import { GetManyResponseDto } from "../../common/dto";
import { BaseService } from "../../common/services";
import { dataSource } from "../../config/database";
import { TeacherEntity } from "./teacher.entity";

export class TeacherService extends BaseService {
  teacherRepository: Repository<TeacherEntity>;

  constructor() {
    super();
    this.teacherRepository = dataSource.getRepository(TeacherEntity);
  }

  public async getAllTeachers(): Promise<GetManyResponseDto<TeacherEntity>> {
    await this.loadDatabase();

    const [teachers, count] = await this.teacherRepository.findAndCount({
      where: {
        active: true,
      },
    });

    return {
      items: teachers,
      count,
    };
  }

  public async getTeacherById(id: string): Promise<TeacherEntity | null> {
    await this.loadDatabase();

    return await this.teacherRepository.findOne({
      where: {
        id,
        active: true,
      },
    });
  }
}
