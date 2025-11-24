import { ApiProperty } from '@nestjs/swagger';

export class CreateGameCommentDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  userId: number;

  @ApiProperty({ example: 1, description: 'Game ID' })
  gameId: number;

  @ApiProperty({ example: 'Great game!', description: 'Comment content' })
  content: string;
}