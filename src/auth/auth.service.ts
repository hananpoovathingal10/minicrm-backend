import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  private users: any[] = [
    {
      id: 1,
      email: 'admin@example.com',
      password: 'admin123',
    }
  ];

  private otps = new Map<string, { otp: string; expires: number }>();

  async sendEmail(to: string, subject: string, html: string): Promise<boolean> {
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure = process.env.SMTP_SECURE === 'true';
    const from = process.env.SMTP_FROM || '"MiniCRM Admin" <noreply@example.com>';

    if (!host || !user || !pass) {
      console.warn('SMTP variables not fully configured. Falling back to console log for email.');
      console.log('\n====================================');
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log('------------------------------------');
      console.log(`Verification Code Body:`);
      console.log(html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
      console.log('====================================\n');
      return false;
    }

    try {
      const transporter = nodemailer.createTransport({
        host,
        port: parseInt(port || '465', 10),
        secure,
        auth: {
          user,
          pass,
        },
      });

      await transporter.sendMail({
        from,
        to,
        subject,
        html,
      });
      return true;
    } catch (error) {
      console.error('Failed to send real email via SMTP:', error);
      console.log('\n====================================');
      console.log(`FALLBACK Console Log - To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
      console.log('====================================\n');
      return false;
    }
  }

  async sendOtp(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 5 * 60 * 1000; // 5 minutes

    this.otps.set(email, { otp, expires });

    const subject = 'Your MiniCRM Login Verification Code';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #4f46e5; margin-bottom: 20px;">Welcome to MiniCRM</h2>
        <p>Use the following verification code to sign in to your account. This code is valid for 5 minutes.</p>
        <div style="background-color: #f3f4f6; font-size: 32px; font-weight: bold; text-align: center; padding: 15px; border-radius: 6px; letter-spacing: 5px; margin: 20px 0; color: #1f2937;">
          ${otp}
        </div>
        <p style="color: #6b7280; font-size: 14px;">If you did not request this login code, you can safely ignore this email.</p>
      </div>
    `;

    const sent = await this.sendEmail(email, subject, html);

    return {
      message: sent ? 'Verification code sent to your real email' : 'Verification code logged in backend console (SMTP not configured)',
      email,
      developmentMode: !sent,
      // If SMTP is not configured, also return the OTP in API response for developer testing if needed,
      // but in production we'd only output it to terminal. To be safe, we will also log it.
      otp: !sent ? otp : undefined,
    };
  }

  verifyOtp(email: string, otp: string) {
    const cached = this.otps.get(email);
    if (!cached) {
      return { success: false, message: 'No verification code sent or it has expired' };
    }

    if (Date.now() > cached.expires) {
      this.otps.delete(email);
      return { success: false, message: 'Verification code has expired' };
    }

    if (cached.otp !== otp) {
      return { success: false, message: 'Invalid verification code' };
    }

    this.otps.delete(email);

    let user = this.users.find((u) => u.email === email);
    if (!user) {
      user = {
        id: this.users.length + 1,
        email,
        password: '',
      };
      this.users.push(user);
    }

    const token = `mock-token-${email}`;
    return {
      success: true,
      message: 'Login successful',
      user,
      token,
      access_token: token,
    };
  }

  register(email: string, password: string, name?: string) {
    const existing = this.users.find((u) => u.email === email);
    if (existing) {
      throw new Error('An account with this email already exists.');
    }

    const user = {
      id: this.users.length + 1,
      name: name || '',
      email,
      password,
    };

    this.users.push(user);

    const token = `mock-token-${email}`;
    return {
      message: 'User registered successfully',
      user: { id: user.id, name: user.name, email: user.email },
      token,
      access_token: token,
    };
  }

  login(email: string, password: string) {
    const user = this.users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      return null;
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
    const cleanToken = token.replace('Bearer ', '').trim();
    if (!cleanToken.startsWith('mock-token-')) {
      return null;
    }
    const email = cleanToken.replace('mock-token-', '');
    return this.users.find((u) => u.email === email) || null;
  }
}