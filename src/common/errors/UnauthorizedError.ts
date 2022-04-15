import { StatusCodes } from "http-status-codes";
import { ResponseError } from "./DefaultResponseError";

export class UnauthorizedError extends ResponseError {
  constructor(message: string) {
    super(message);
    this.httpStatus = StatusCodes.UNAUTHORIZED;
  }
}
