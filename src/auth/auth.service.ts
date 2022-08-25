import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  async login({ usernameOrEmail, password }: LoginDto) {
    const user = await this.userService.verifyUser(usernameOrEmail, password);
    const claims: any = { sub: user.id, email: user.email };

    const accessToken = await this.jwtService.signAsync(claims, {
      expiresIn: '7d',
      secret: 'test-key',
    });

    return {
      jwt: accessToken,
    };
  }
}
