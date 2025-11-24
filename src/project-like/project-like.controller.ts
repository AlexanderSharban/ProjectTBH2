import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProjectLikeService } from './project-like.service';
import { CreateProjectLikeDto } from './dto/create-project-like.dto';
import { UpdateProjectLikeDto } from './dto/update-project-like.dto';
import { ProjectLike } from './entities/project-like.entity';

@ApiTags('project-likes')
@Controller('project-likes')
export class ProjectLikeController {
  constructor(private readonly service: ProjectLikeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project like' })
  @ApiResponse({ status: 201, description: 'Created', type: ProjectLike })
  create(@Body() dto: CreateProjectLikeDto): Promise<ProjectLike> {
    return this.service.create(dto);
  }

  @Get()
  findAll(): Promise<ProjectLike[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProjectLike> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProjectLikeDto): Promise<ProjectLike> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}