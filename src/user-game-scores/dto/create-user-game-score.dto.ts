import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserGameScoreDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  gameId: number;

  @IsNotEmpty()
  @IsNumber()
  score: number;
}