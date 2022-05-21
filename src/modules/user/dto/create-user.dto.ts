import { Roles } from "../../../common/enums";

export interface CreateUserDto {
  cognitoId: string;
  name: string;
  email: string;
  role: Roles;
}
