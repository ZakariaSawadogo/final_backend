import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() req) {
    // Note: Dans un vrai projet, utilise un DTO et valide le password hashé
    // Ici, on fait appel direct à validateUser pour simplifier l'exemple
    const validUser = await this.authService.validateUser(req.username, req.password);
    if (!validUser) {
      throw new UnauthorizedException('Identifiants incorrects');
    }
    return this.authService.login(validUser);
  }
}