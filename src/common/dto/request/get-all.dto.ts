export interface GetManyRequestDto {
  take?: number;
  skip?: number;
  orderBy?: string;
  orderDirection?: "DESC" | "ASC" | "asc" | "desc";
}
