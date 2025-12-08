import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string) {
    if (!email || !password) throw new BadRequestException('Email and password are required');

    const username = email.split('@')[0];

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.usersService.create({
      email,
      username,
      passwordHash,
    } as any);

    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { token };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, (user as any).passwordHash);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { token };
  }
}
