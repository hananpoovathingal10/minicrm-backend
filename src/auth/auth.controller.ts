import { Body, Controller, Post, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  login(@Body() body: any) {
    const result = this.authService.login(body.email, body.password);
    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return result;
  }

  @Get('profile')
  profile(@Headers('authorization') authHeader: string) {
    const user = this.authService.getProfile(authHeader);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}