import { GetManyRequestDto } from "../../../common/dto";

export interface GetCoursesRequestDto extends GetManyRequestDto {
  query?: string;
  loadUser?: boolean;
  userId?: string;
  published?: boolean;
}
