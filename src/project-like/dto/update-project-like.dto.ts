import { PartialType } from '@nestjs/swagger';
import { CreateProjectLikeDto } from './create-project-like.dto';

export class UpdateProjectLikeDto extends PartialType(CreateProjectLikeDto) {}