import { GetManyRequestDto } from "../../../../common/dto";

export interface GetCoursesRequestDto extends GetManyRequestDto {
  query?: string;
  loadTeacher?: boolean;
}
