import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private items: User[] = [];
  private idCounter = 1;

  async create(dto: CreateUserDto): Promise<User> {
    const user: User = {
      id: this.idCounter++,
      email: dto.email,
      username: dto.username,
      passwordHash: dto.passwordHash,
      createdAt: new Date(),
    } as any;
    this.items.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.items;
  }

  async findOne(id: number): Promise<User> {
    const u = this.items.find(i => i.id === id);
    if (!u) throw new NotFoundException(`User with ID ${id} not found`);
    return u;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const u = await this.findOne(id);
    Object.assign(u, dto);
    return u;
  }

  async remove(id: number): Promise<void> {
    const idx = this.items.findIndex(i => i.id === id);
    if (idx === -1) throw new NotFoundException(`User with ID ${id} not found`);
    this.items.splice(idx, 1);
  }
}