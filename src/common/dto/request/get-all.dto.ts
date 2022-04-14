export interface GetAllRequestDto {
  take?: number;
  skip?: number;
  orderBy?: string;
  orderDirection?: "DESC" | "ASC" | "asc" | "desc";
}
