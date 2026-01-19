import { ApiProperty } from '@nestjs/swagger';

export class CreateUserGameScoresDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  userId: number;

  @ApiProperty({ example: 1, description: 'Game ID' })
  gameId: number;

  @ApiProperty({ example: 9999, description: 'Score' })
  score: number;
}