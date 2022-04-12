export class ResponseBodyDto {
  code: number;
  message: string;
  data?: object;
}

export class ResponseDto {
  statusCode: number;
  body: string;
}
