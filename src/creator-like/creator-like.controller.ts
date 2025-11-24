import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreatorLikeService } from './creator-like.service';
import { CreateCreatorLikeDto } from './dto/create-creator-like.dto';
import { UpdateCreatorLikeDto } from './dto/update-creator-like.dto';
import { CreatorLike } from './entities/creator-like.entity';

@ApiTags('creator-likes')
@Controller('creator-likes')
export class CreatorLikeController {
  constructor(private readonly creatorLikeService: CreatorLikeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new creator like' })
  @ApiResponse({ status: 201, description: 'CreatorLike created successfully', type: CreatorLike })
  create(@Body() createCreatorLikeDto: CreateCreatorLikeDto): Promise<CreatorLike> {
    return this.creatorLikeService.create(createCreatorLikeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all creator likes' })
  @ApiResponse({ status: 200, description: 'List of all creator likes', type: [CreatorLike] })
  findAll(): Promise<CreatorLike[]> {
    return this.creatorLikeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get creator like by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'CreatorLike ID' })
  @ApiResponse({ status: 200, description: 'CreatorLike found', type: CreatorLike })
  @ApiResponse({ status: 404, description: 'CreatorLike not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CreatorLike> {
    return this.creatorLikeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update creator like' })
  @ApiParam({ name: 'id', type: 'number', description: 'CreatorLike ID' })
  @ApiResponse({ status: 200, description: 'CreatorLike updated', type: CreatorLike })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCreatorLikeDto: UpdateCreatorLikeDto,
  ): Promise<CreatorLike> {
    return this.creatorLikeService.update(id, updateCreatorLikeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete creator like' })
  @ApiParam({ name: 'id', type: 'number', description: 'CreatorLike ID' })
  @ApiResponse({ status: 200, description: 'CreatorLike deleted' })
  @ApiResponse({ status: 404, description: 'CreatorLike not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.creatorLikeService.remove(id);
  }
}