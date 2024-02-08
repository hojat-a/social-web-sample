import { IsString } from "class-validator"

export class UserParamDto {
  @IsString()
  username: string
}