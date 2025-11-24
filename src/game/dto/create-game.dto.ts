import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiProperty({ example: 'Game Title', description: 'Game title' })
  title: string;

  @ApiProperty({ example: 'game-title', description: 'Unique slug' })
  slug: string;

  @ApiProperty({ example: 'Game description', description: 'Description', required: false })
  description?: string;

  @ApiProperty({ example: 1, description: 'Creator ID' })
  creatorId: number;
}