import { PartialType } from '@nestjs/swagger';
import { CreateGameLikeDto } from './create-game-like.dto';

export class UpdateGameLikeDto extends PartialType(CreateGameLikeDto) {}