export interface ResponseBodyDto {
  code: string;
  message: string;
  data?: object;
}

export interface ResponseDto {
  statusCode: number;
  body: string;
}
