import { ApiProperty } from '@nestjs/swagger';

export class CreateGameLikeDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  userId: number;

  @ApiProperty({ example: 1, description: 'Game ID' })
  gameId: number;
}