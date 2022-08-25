import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    excludeExtraneousValues: false,
  })
  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
