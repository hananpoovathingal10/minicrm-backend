import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private users: any[] = [
    {
      id: 1,
      email: 'admin@example.com',
      password: 'admin123',
    }
  ];

  register(email: string, password: string) {
    const user = {
      id: this.users.length + 1,
      email,
      password,
    };

    this.users.push(user);

    const token = `mock-token-${email}`;
    return {
      message: 'User registered successfully',
      user,
      token,
      access_token: token,
    };
  }

  login(email: string, password: string) {
    const user = this.users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      return null; // Controller can check this and throw exception
    }

    const token = `mock-token-${email}`;
    return {
      message: 'Login successful',
      user,
      token,
      access_token: token,
    };
  }

  getProfile(token: string) {
    if (!token) {
      return null;
    }
    // Extract email from "Bearer mock-token-email" or just "mock-token-email"
    const cleanToken = token.replace('Bearer ', '').trim();
    if (!cleanToken.startsWith('mock-token-')) {
      return null;
    }
    const email = cleanToken.replace('mock-token-', '');
    return this.users.find((u) => u.email === email) || null;
  }
}