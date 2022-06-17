export interface GetCoursesRequestDto {
  query?: string;
  loadUser?: "true" | "false";
  published?: "true" | "false";
}
