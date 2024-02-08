import {IsInt, IsOptional, IsString } from "class-validator"
import {Type} from 'class-transformer'
 
export class QueryDto {
  @IsOptional()
  @IsString()
  firstname: string

  @IsOptional()
  @IsString()
  lastname: string

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  age: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  pageSize: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  maxAge: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  minAge: number
}