import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreatorService } from './creator.service';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { Creator } from './entities/creator.entity';

@ApiTags('creators')
@Controller('creators')
export class CreatorsController {
  constructor(private readonly creatorsService: CreatorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new creator' })
  @ApiResponse({ status: 201, description: 'Creator created successfully', type: Creator })
  create(@Body() createCreatorDto: CreateCreatorDto): Promise<Creator> {
    return this.creatorsService.create(createCreatorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all creators' })
  @ApiResponse({ status: 200, description: 'List of all creators', type: [Creator] })
  findAll(): Promise<Creator[]> {
    return this.creatorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get creator by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Creator ID' })
  @ApiResponse({ status: 200, description: 'Creator found', type: Creator })
  @ApiResponse({ status: 404, description: 'Creator not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Creator> {
    return this.creatorsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update creator' })
  @ApiParam({ name: 'id', type: 'number', description: 'Creator ID' })
  @ApiResponse({ status: 200, description: 'Creator updated', type: Creator })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCreatorDto: UpdateCreatorDto,
  ): Promise<Creator> {
    return this.creatorsService.update(id, updateCreatorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete creator' })
  @ApiParam({ name: 'id', type: 'number', description: 'Creator ID' })
  @ApiResponse({ status: 200, description: 'Creator deleted' })
  @ApiResponse({ status: 404, description: 'Creator not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.creatorsService.remove(id);
  }
}