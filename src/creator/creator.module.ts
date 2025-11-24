import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatorService } from './creator.service';
import { CreatorsController } from './creator.controller';
import { Creator } from './entities/creator.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Creator])
  ],
  controllers: [CreatorsController],
  providers: [CreatorService],
})
export class CreatorModule {}