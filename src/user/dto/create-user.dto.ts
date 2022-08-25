import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
