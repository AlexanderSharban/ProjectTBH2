import { PartialType } from '@nestjs/mapped-types';
import { CreateUserGameScoreDto } from './create-user-game-score.dto';

export class UpdateUserGameScoreDto extends PartialType(CreateUserGameScoreDto) {}