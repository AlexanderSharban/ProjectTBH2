import { PartialType } from '@nestjs/swagger';
import { CreateProjectPhotoCommentDto } from './create-project-photo-comment.dto';

export class UpdateProjectPhotoCommentDto extends PartialType(CreateProjectPhotoCommentDto) {}