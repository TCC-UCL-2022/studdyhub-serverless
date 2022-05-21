import { Repository } from "typeorm";
import { NotFoundError } from "../../common/errors";
import { BaseService } from "../../common/services";
import { dataSource } from "../../config/database";
import { TeacherEntity } from "./teacher.entity";

export class TeacherService extends BaseService {
  teacherRepository: Repository<TeacherEntity>;

  constructor() {
    super();
    this.teacherRepository = dataSource.getRepository(TeacherEntity);
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

  public async createTeacher(teacher: TeacherEntity): Promise<TeacherEntity> {
    await this.loadDatabase();

    return await this.teacherRepository.save(teacher);
  }

  public async updateTeacher(
    id: string,
    teacher: Partial<TeacherEntity>
  ): Promise<TeacherEntity> {
    await this.loadDatabase();

    const existingTeacher = await this.teacherRepository.findOne({
      where: {
        id,
        active: true,
      },
    });

    if (!existingTeacher) {
      throw new NotFoundError("Teacher not found");
    }

    return await this.teacherRepository.save({
      ...existingTeacher,
      ...teacher,
    });
  }
}
