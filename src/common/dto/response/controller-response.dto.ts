export interface ResponseDto {
  statusCode: number;
  body: string;
}

export interface ResponseErrorDto {
  httpStatus: number;
  message: string;
}
