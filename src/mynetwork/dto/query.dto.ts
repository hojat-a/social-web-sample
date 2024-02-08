import { IsNotEmpty } from "class-validator";

export class QueryDto {
  page : number
  pageSize: number
}
