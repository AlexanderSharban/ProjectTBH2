import { PartialType } from '@nestjs/swagger';
import { CreateProjectPhotoDto } from './create-project-photo.dto';

export class UpdateProjectPhotoDto extends PartialType(CreateProjectPhotoDto) {}