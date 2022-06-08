import { Document } from "dynamoose/dist/Document";

export class BaseModel extends Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
