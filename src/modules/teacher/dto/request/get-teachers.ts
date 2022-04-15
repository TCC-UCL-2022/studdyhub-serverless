import { GetManyRequestDto } from "../../../../common/dto";

export interface GetTeachersRequestDto extends GetManyRequestDto {
  query?: string;
}
