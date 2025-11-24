import { PartialType } from '@nestjs/swagger';
import { CreateUserGameScoresDto } from './create-user-game-scores.dto';

export class UpdateUserGameScoresDto extends PartialType(CreateUserGameScoresDto) {}