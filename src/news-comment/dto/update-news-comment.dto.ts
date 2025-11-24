import { PartialType } from '@nestjs/swagger';
import { CreateNewsCommentDto } from './create-news-comment.dto';

export class UpdateNewsCommentDto extends PartialType(CreateNewsCommentDto) {}