import { PartialType } from '@nestjs/swagger';
import { CreateCreatorCommentDto } from './create-creator-comment.dto';

export class UpdateCreatorCommentDto extends PartialType(CreateCreatorCommentDto) {}