import { PartialType } from '@nestjs/swagger';
import { CreateNewsLikeDto } from './create-news-like.dto';

export class UpdateNewsLikeDto extends PartialType(CreateNewsLikeDto) {}