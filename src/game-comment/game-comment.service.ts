import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feature } from './entities/feature.entity';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { Monitor } from '../monitor/entities/monitor.entity';

@Injectable()
export class FeaturesService {
  private features: Feature[] = [];
  private idCounter = 1;

  async create(createFeatureDto: CreateFeatureDto): Promise<Feature> {
    const feature: Feature = {
      id: this.idCounter++,
      ...createFeatureDto,
      monitor: { id: createFeatureDto.monitorId } as any,
    };
    this.features.push(feature);
    return feature;
  }

  async findAll(): Promise<Feature[]> {
    return this.features;
  }

  async findOne(id: number): Promise<Feature> {
    const feature = this.features.find(f => f.id === id);
    if (!feature) {
      throw new NotFoundException(`Feature with ID ${id} not found`);
    }
    return feature;
  }

  async update(id: number, updateFeatureDto: UpdateFeatureDto): Promise<Feature> {
    const feature = await this.findOne(id);
    Object.assign(feature, updateFeatureDto);
    return feature;
  }

  async remove(id: number): Promise<void> {
    const index = this.features.findIndex(f => f.id === id);
    if (index === -1) {
      throw new NotFoundException(`Feature with ID ${id} not found`);
    }
    this.features.splice(index, 1);
  }

  async findByMonitorId(monitorId: number): Promise<Feature[]> {
    return this.features.filter(f => f.monitorId === monitorId);
  }
}