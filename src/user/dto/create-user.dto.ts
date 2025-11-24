import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  email: string;

  @ApiProperty({ example: 'username', description: 'Unique username' })
  username: string;

  @ApiProperty({ example: 'hashed_password', description: 'Password hash' })
  passwordHash: string;
}