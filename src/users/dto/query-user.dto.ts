import { IsNumber, IsOptional, IsString } from "class-validator"

export class QueryDto {
  @IsOptional()
  @IsString()
  firstname: string

  @IsOptional()
  @IsString()
  lastname: string

  @IsOptional()
  @IsNumber()
  age: number

  @IsOptional()
  @IsNumber()
  page: number

  @IsOptional()
  @IsNumber()
  pageSize: number

  @IsOptional()
  @IsNumber()
  maxAge: number

  @IsOptional()
  @IsNumber()
  minAge: number
}