export interface ResponseBodyDto {
  code: number;
  message: string;
  data?: object;
}

export interface ResponseDto {
  statusCode: number;
  body: string;
}
