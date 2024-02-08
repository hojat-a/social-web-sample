import { IsNotEmpty, IsString } from "class-validator";

export class CreateMyNetworkDto {
  @IsNotEmpty()
  @IsString()
  username : string
}
