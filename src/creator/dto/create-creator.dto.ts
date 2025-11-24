import { ApiProperty } from '@nestjs/swagger';

export class CreateCreatorDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  userId: number;

  @ApiProperty({ example: 'John Doe', description: 'Creator name' })
  name: string;

  @ApiProperty({ example: 'Short bio', description: 'Bio', required: false })
  bio?: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', description: 'Avatar URL', required: false })
  avatarUrl?: string;
}