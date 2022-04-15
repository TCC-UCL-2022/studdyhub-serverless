import { StatusCodes } from "http-status-codes";
import { ResponseDto } from "../dto";
import { ResponseError } from "../errors";

class Result {
  private statusCode: number;
  private data?: any;

  constructor(statusCode: number, data?: string | object) {
    this.statusCode = statusCode;
    this.data = data;
  }

  /**
   * Serverless: According to the API Gateway specs, the body content must be stringified
   */
  bodyToString() {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify(this.data),
    };
  }
}

export class MessageUtil {
  static success(data: any): ResponseDto {
    const result = new Result(StatusCodes.OK, data);

    return result.bodyToString();
  }

  static error(error: unknown): ResponseDto {
    let result: Result;

    if (error instanceof ResponseError) {
      result = new Result(error.httpStatus, {
        error: error.message,
      });
    } else {
      result = new Result(StatusCodes.INTERNAL_SERVER_ERROR, {
        error: (error as any).message || "Internal Server Error",
      });
    }

    return result.bodyToString();
  }
}
