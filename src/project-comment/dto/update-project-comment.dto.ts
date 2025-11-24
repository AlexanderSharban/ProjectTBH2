import { PartialType } from '@nestjs/swagger';
import { CreateProjectCommentDto } from './create-project-comment.dto';

export class UpdateProjectCommentDto extends PartialType(CreateProjectCommentDto) {}