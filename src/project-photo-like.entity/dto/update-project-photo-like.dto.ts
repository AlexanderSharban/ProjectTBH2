import { PartialType } from '@nestjs/swagger';
import { CreateProjectPhotoLikeDto } from './create-project-photo-like.dto';

export class UpdateProjectPhotoLikeDto extends PartialType(CreateProjectPhotoLikeDto) {}