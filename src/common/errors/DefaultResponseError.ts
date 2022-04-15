import { StatusCodes } from "http-status-codes";

export interface ResponseErrorProps {
  httpStatus: number;
  message: string;
}

export class ResponseError extends Error {
  public httpStatus: number;

  constructor(value: ResponseErrorProps | string) {
    if (typeof value === "string") {
      super(value);
      this.httpStatus = StatusCodes.INTERNAL_SERVER_ERROR;
    } else {
      super(value.message);
      this.httpStatus = value.httpStatus;
    }
  }
}
