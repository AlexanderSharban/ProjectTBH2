import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProjectPhotoLikeService } from './project-photo-like.service';
import { CreateProjectPhotoLikeDto } from './dto/create-project-photo-like.dto';
import { UpdateProjectPhotoLikeDto } from './dto/update-project-photo-like.dto';
import { ProjectPhotoLike } from './entities/project-photo-like.entity';

@ApiTags('project-photo-likes')
@Controller('project-photo-likes')
export class ProjectPhotoLikeController {
  constructor(private readonly projectPhotoLikeService: ProjectPhotoLikeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project photo like' })
  @ApiResponse({ status: 201, description: 'Project photo like created successfully', type: ProjectPhotoLike })
  create(@Body() createProjectPhotoLikeDto: CreateProjectPhotoLikeDto): Promise<ProjectPhotoLike> {
    return this.projectPhotoLikeService.create(createProjectPhotoLikeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all project photo likes' })
  @ApiResponse({ status: 200, description: 'List of all project photo likes', type: [ProjectPhotoLike] })
  findAll(): Promise<ProjectPhotoLike[]> {
    return this.projectPhotoLikeService.findAll();
  }

  @Get('project-photo/:projectPhotoId')
  @ApiOperation({ summary: 'Get likes by project photo ID' })
  @ApiParam({ name: 'projectPhotoId', type: 'number' })
  findByProjectPhotoId(@Param('projectPhotoId', ParseIntPipe) projectPhotoId: number): Promise<ProjectPhotoLike[]> {
    return this.projectPhotoLikeService.findByProjectPhotoId(projectPhotoId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project photo like' })
  @ApiParam({ name: 'id', type: 'number', description: 'Project photo like ID' })
  @ApiResponse({ status: 200, description: 'Project photo like updated', type: ProjectPhotoLike })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectPhotoLikeDto: UpdateProjectPhotoLikeDto,
  ): Promise<ProjectPhotoLike> {
    return this.projectPhotoLikeService.update(id, updateProjectPhotoLikeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project photo like' })
  @ApiParam({ name: 'id', type: 'number', description: 'Project photo like ID' })
  @ApiResponse({ status: 200, description: 'Project photo like deleted' })
  @ApiResponse({ status: 404, description: 'Project photo like not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.projectPhotoLikeService.remove(id);
  }
}