import { Roles } from "../../../common/enums";

export interface UpdateUserDto {
  name: string;
  email: string;
  role: Roles;
}
