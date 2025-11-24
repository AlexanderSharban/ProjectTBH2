import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { FeaturesService } from './feature.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { Feature } from './entities/feature.entity';

@ApiTags('features')
@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new feature' })
  @ApiResponse({ status: 201, description: 'Feature created successfully', type: Feature })
  create(@Body() createFeatureDto: CreateFeatureDto): Promise<Feature> {
    return this.featuresService.create(createFeatureDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all features with their monitors' })
  @ApiResponse({ status: 200, description: 'List of all features', type: [Feature] })
  findAll(): Promise<Feature[]> {
    return this.featuresService.findAll();
  }

  @Get('monitor/:monitorId')
  @ApiOperation({ summary: 'Get features by monitor ID' })
  @ApiParam({ name: 'monitorId', type: 'number', description: 'Monitor ID' })
  @ApiResponse({ status: 200, description: 'List of features for the monitor', type: [Feature] })
  findByMonitorId(@Param('monitorId', ParseIntPipe) monitorId: number): Promise<Feature[]> {
    return this.featuresService.findByMonitorId(monitorId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get feature by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Feature ID' })
  @ApiResponse({ status: 200, description: 'Feature found', type: Feature })
  @ApiResponse({ status: 404, description: 'Feature not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Feature> {
    return this.featuresService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update feature' })
  @ApiParam({ name: 'id', type: 'number', description: 'Feature ID' })
  @ApiResponse({ status: 200, description: 'Feature updated', type: Feature })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFeatureDto: UpdateFeatureDto,
  ): Promise<Feature> {
    return this.featuresService.update(id, updateFeatureDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete feature' })
  @ApiParam({ name: 'id', type: 'number', description: 'Feature ID' })
  @ApiResponse({ status: 200, description: 'Feature deleted' })
  @ApiResponse({ status: 404, description: 'Feature not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.featuresService.remove(id);
  }
}