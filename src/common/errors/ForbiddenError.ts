import { StatusCodes } from "http-status-codes";
import { ResponseError } from "./DefaultResponseError";

export class ForbiddenError extends ResponseError {
  constructor(message: string) {
    super(message);
    this.httpStatus = StatusCodes.FORBIDDEN;
  }
}
