import { StatusCodes } from "http-status-codes";
import { ResponseError } from "./DefaultResponseError";

export class NotFoundError extends ResponseError {
  constructor(message: string) {
    super(message);
    this.httpStatus = StatusCodes.NOT_FOUND;
  }
}
