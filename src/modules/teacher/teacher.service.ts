import { Like, Repository } from "typeorm";
import { GetManyResponseDto } from "../../common/dto";
import { NotFoundError } from "../../common/errors";
import { BaseService } from "../../common/services";
import { dataSource } from "../../config/database";
import { GetTeachersRequestDto } from "./dto/request";
import { TeacherEntity } from "./teacher.entity";

export class TeacherService extends BaseService {
  teacherRepository: Repository<TeacherEntity>;

  constructor() {
    super();
    this.teacherRepository = dataSource.getRepository(TeacherEntity);
  }

  public async getAllTeachers({
    query,
    skip,
    take,
    orderBy,
    orderDirection,
  }: GetTeachersRequestDto): Promise<GetManyResponseDto<TeacherEntity>> {
    await this.loadDatabase();

    const [teachers, count] = await this.teacherRepository.findAndCount({
      where: {
        active: true,
        name: query && Like(`%${query}%`),
      },
      skip,
      take,
      order: {
        ...(orderBy && {
          [orderBy]: orderDirection ?? "ASC",
        }),
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
