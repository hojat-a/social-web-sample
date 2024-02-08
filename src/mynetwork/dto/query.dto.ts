import {IsInt, IsOptional } from "class-validator"
import {Type} from 'class-transformer'

export class QueryDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  pageSize: number
}
