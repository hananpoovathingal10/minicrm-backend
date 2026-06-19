import { Body, Controller, Post, Get, Headers, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: any) {
    try {
      return this.authService.register(body.email, body.password, body.name);
    } catch (err: any) {
      throw new ConflictException(err.message || 'Registration failed');
    }
  }

  @Post('login')
  login(@Body() body: any) {
    const result = this.authService.login(body.email, body.password);
    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return result;
  }

  @Post('send-otp')
  sendOtp(@Body() body: any) {
    if (!body.email) {
      throw new BadRequestException('Email is required');
    }
    return this.authService.sendOtp(body.email);
  }

  @Post('verify-otp')
  verifyOtp(@Body() body: any) {
    if (!body.email || !body.otp) {
      throw new BadRequestException('Email and OTP code are required');
    }
    const result = this.authService.verifyOtp(body.email, body.otp);
    if (!result.success) {
      throw new UnauthorizedException(result.message);
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