import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturesService } from './feature.service';
import { FeaturesController } from './feature.controller';
import { Feature } from './entities/feature.entity';
import { Monitor } from '../monitor/entities/monitor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feature, Monitor])
  ],
  controllers: [FeaturesController],
  providers: [FeaturesService],
})
export class FeaturesModule {}