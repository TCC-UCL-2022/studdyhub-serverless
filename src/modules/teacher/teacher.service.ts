import { Repository } from "typeorm";
import { NotFoundError } from "../../common/errors";
import { BaseService } from "../../common/services";
import { dataSource } from "../../config/database";
import { Teacher } from "./teacher.entity";

export class TeacherService extends BaseService {
  teacherRepository: Repository<Teacher>;

  constructor() {
    super();
    this.teacherRepository = dataSource.getRepository(Teacher);
  }

  public async getTeacherById(id: string): Promise<Teacher> {
    await this.loadDatabase();

    const teacher = await this.teacherRepository.findOne({
      where: {
        id,
        active: true,
      },
    });

    if (!teacher) {
      throw new NotFoundError("Teacher not found");
    }

    return teacher;
  }

  public async createTeacher(teacher: Teacher): Promise<Teacher> {
    await this.loadDatabase();

    return await this.teacherRepository.save(teacher);
  }

  public async updateTeacher(
    id: string,
    teacher: Partial<Teacher>
  ): Promise<Teacher> {
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
