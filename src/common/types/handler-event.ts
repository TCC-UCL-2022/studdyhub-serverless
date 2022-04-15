export interface HandlerEvent<Q = {}, P = undefined> {
  queryStringParameters: Q;
  pathParameters: P extends undefined ? Q : P;
}
