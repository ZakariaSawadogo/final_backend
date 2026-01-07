import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() req) {

    const validUser = await this.authService.validateUser(req.username, req.password);
    if (!validUser) {
      throw new UnauthorizedException('Incorrect identifiers');
    }
    return this.authService.login(validUser);
  }
}