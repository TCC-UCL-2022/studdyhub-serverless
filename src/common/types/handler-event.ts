export interface HandlerEvent<T = {}> {
  queryStringParameters: T;
  pathParameters: T;
  body: any;
}
