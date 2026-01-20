import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProjectPhotoCommentService } from './project-photo-comment.service';
import { CreateProjectPhotoCommentDto } from './dto/create-project-photo-comment.dto';
import { UpdateProjectPhotoCommentDto } from './dto/update-project-photo-comment.dto';
import { ProjectPhotoComment } from './entities/project-photo-comment.entity';

@ApiTags('project-photo-comments')
@Controller('project-photo-comments')
export class ProjectPhotoCommentController {
  constructor(private readonly projectPhotoCommentService: ProjectPhotoCommentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project photo comment' })
  @ApiResponse({ status: 201, description: 'Project photo comment created successfully', type: ProjectPhotoComment })
  create(@Body() createProjectPhotoCommentDto: CreateProjectPhotoCommentDto): Promise<ProjectPhotoComment> {
    return this.projectPhotoCommentService.create(createProjectPhotoCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all project photo comments' })
  @ApiResponse({ status: 200, description: 'List of all project photo comments', type: [ProjectPhotoComment] })
  findAll(): Promise<ProjectPhotoComment[]> {
    return this.projectPhotoCommentService.findAll();
  }

  @Get('project-photo/:projectPhotoId')
  @ApiOperation({ summary: 'Get comments by project photo ID' })
  @ApiParam({ name: 'projectPhotoId', type: 'number' })
  findByProjectPhotoId(@Param('projectPhotoId', ParseIntPipe) projectPhotoId: number): Promise<ProjectPhotoComment[]> {
    return this.projectPhotoCommentService.findByProjectPhotoId(projectPhotoId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project photo comment' })
  @ApiParam({ name: 'id', type: 'number', description: 'Project photo comment ID' })
  @ApiResponse({ status: 200, description: 'Project photo comment updated', type: ProjectPhotoComment })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectPhotoCommentDto: UpdateProjectPhotoCommentDto,
  ): Promise<ProjectPhotoComment> {
    return this.projectPhotoCommentService.update(id, updateProjectPhotoCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project photo comment' })
  @ApiParam({ name: 'id', type: 'number', description: 'Project photo comment ID' })
  @ApiResponse({ status: 200, description: 'Project photo comment deleted' })
  @ApiResponse({ status: 404, description: 'Project photo comment not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.projectPhotoCommentService.remove(id);
  }
}