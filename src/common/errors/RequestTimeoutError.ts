import { StatusCodes } from "http-status-codes";
import { ResponseError } from "./DefaultResponseError";

export class RequestTimeoutError extends ResponseError {
  constructor(message: string) {
    super(message);
    this.httpStatus = StatusCodes.REQUEST_TIMEOUT;
  }
}
