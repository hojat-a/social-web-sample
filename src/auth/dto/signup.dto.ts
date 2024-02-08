import {IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  age: number

  @IsNotEmpty()
  firstname: string

  @IsNotEmpty()
  lastname: string
}