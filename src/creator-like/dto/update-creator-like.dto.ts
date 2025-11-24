import { PartialType } from '@nestjs/swagger';
import { CreateCreatorLikeDto } from './create-creator-like.dto';

export class UpdateCreatorLikeDto extends PartialType(CreateCreatorLikeDto) {}