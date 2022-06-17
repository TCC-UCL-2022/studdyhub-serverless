import { Item } from "dynamoose/dist/Item";

export class BaseModel extends Item {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
