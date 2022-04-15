import { StatusCodes } from "http-status-codes";
import { ResponseError } from "./DefaultResponseError";

export class BadRequestError extends ResponseError {
  constructor(message: string) {
    super(message);
    this.httpStatus = StatusCodes.BAD_REQUEST;
  }
}
