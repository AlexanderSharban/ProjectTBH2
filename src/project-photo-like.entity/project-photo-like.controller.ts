import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProjectPhotoLikeService } from './project-photo-like.service';
import { CreateProjectPhotoLikeDto } from './dto/create-project-photo-like.dto';
import { UpdateProjectPhotoLikeDto } from './dto/update-project-photo-like.dto';
import { ProjectPhotoLike } from './entities/project-photo-like.entity';

@ApiTags('project-photo-likes')
@Controller('project-photo-likes')
export class ProjectPhotoLikeController {
  constructor(private readonly service: ProjectPhotoLikeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project photo like' })
  @ApiResponse({ status: 201, description: 'Created', type: ProjectPhotoLike })
  create(@Body() dto: CreateProjectPhotoLikeDto): Promise<ProjectPhotoLike> {
    return this.service.create(dto);
  }

  @Get()
  findAll(): Promise<ProjectPhotoLike[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProjectPhotoLike> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProjectPhotoLikeDto): Promise<ProjectPhotoLike> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}