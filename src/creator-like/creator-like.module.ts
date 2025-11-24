import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatorLikeService } from './creator-like.service';
import { CreatorLikeController } from './creator-like.controller';
import { CreatorLike } from './entities/creator-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreatorLike])],
  controllers: [CreatorLikeController],
  providers: [CreatorLikeService],
})
export class CreatorLikeModule {}