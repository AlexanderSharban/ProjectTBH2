import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreatorService } from '../creator/creator.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private creatorService: CreatorService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) throw new BadRequestException('User with this email already exists');

    const username = dto.username || dto.email.split('@')[0];

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create({
      email: dto.email,
      username,
      passwordHash,
    });

    // Create creator profile
    await this.creatorService.create({
      userId: user.id,
      name: username,
      bio: '',
      avatarUrl: '',
    });

    const creator = await this.creatorService.findByUserId(user.id);
    if (!creator) throw new Error('Creator profile not found');

    const token = this.jwtService.sign({ id: user.id, email: user.email, creatorId: creator.id });
    return { token };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, (user as any).passwordHash);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const creator = await this.creatorService.findByUserId(user.id);
    if (!creator) throw new UnauthorizedException('Creator profile not found');

    const token = this.jwtService.sign({ id: user.id, email: user.email, creatorId: creator.id });
    return { token };
  }
}
