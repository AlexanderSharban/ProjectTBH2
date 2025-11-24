import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProjectCommentService } from './project-comment.service';
import { CreateProjectCommentDto } from './dto/create-project-comment.dto';
import { UpdateProjectCommentDto } from './dto/update-project-comment.dto';
import { ProjectComment } from './entities/project-comment.entity';

@ApiTags('project-comments')
@Controller('project-comments')
export class ProjectCommentController {
  constructor(private readonly projectCommentService: ProjectCommentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project comment' })
  @ApiResponse({ status: 201, description: 'Project comment created successfully', type: ProjectComment })
  create(@Body() createProjectCommentDto: CreateProjectCommentDto): Promise<ProjectComment> {
    return this.projectCommentService.create(createProjectCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all project comments' })
  @ApiResponse({ status: 200, description: 'List of all project comments', type: [ProjectComment] })
  findAll(): Promise<ProjectComment[]> {
    return this.projectCommentService.findAll();
  }
  

  @Get(':id')
  @ApiOperation({ summary: 'Get project comment by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Project comment ID' })
  @ApiResponse({ status: 200, description: 'Project comment found', type: ProjectComment })
  @ApiResponse({ status: 404, description: 'Project comment not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProjectComment> {
    return this.projectCommentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project comment' })
  @ApiParam({ name: 'id', type: 'number', description: 'Project comment ID' })
  @ApiResponse({ status: 200, description: 'Project comment updated', type: ProjectComment })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectCommentDto: UpdateProjectCommentDto,
  ): Promise<ProjectComment> {
    return this.projectCommentService.update(id, updateProjectCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project comment' })
  @ApiParam({ name: 'id', type: 'number', description: 'Project comment ID' })
  @ApiResponse({ status: 200, description: 'Project comment deleted' })
  @ApiResponse({ status: 404, description: 'Project comment not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.projectCommentService.remove(id);
  }
}