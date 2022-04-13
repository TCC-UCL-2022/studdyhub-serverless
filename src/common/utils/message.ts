import { StatusCodes } from "http-status-codes";
import { ResponseDto } from "../dto";

class Result {
  private statusCode: number;
  private code: number;
  private message: string;
  private data?: any;

  constructor(statusCode: number, code: number, message: string, data?: any) {
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.data = data;
  }

  /**
   * Serverless: According to the API Gateway specs, the body content must be stringified
   */
  bodyToString() {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify({
        code: this.code,
        message: this.message,
        data: this.data,
      }),
    };
  }
}

export class MessageUtil {
  static success(data?: object | string): ResponseDto {
    const result = new Result(StatusCodes.OK, 0, "success", data);

    return result.bodyToString();
  }

  static error(
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    code: number = 1000,
    message: string
  ) {
    const result = new Result(statusCode, code, message);

    console.log(result.bodyToString());
    return result.bodyToString();
  }
}
