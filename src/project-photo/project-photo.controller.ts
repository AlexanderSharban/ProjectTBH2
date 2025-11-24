import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProjectPhotoService } from './project-photo.service';
import { CreateProjectPhotoDto } from './dto/create-project-photo.dto';
import { UpdateProjectPhotoDto } from './dto/update-project-photo.dto';
import { ProjectPhoto } from './entities/project-photo.entity';

@ApiTags('project-photos')
@Controller('project-photos')
export class ProjectPhotoController {
  constructor(private readonly projectPhotoService: ProjectPhotoService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project photo' })
  @ApiResponse({ status: 201, description: 'Project photo created successfully', type: ProjectPhoto })
  create(@Body() createProjectPhotoDto: CreateProjectPhotoDto): Promise<ProjectPhoto> {
    return this.projectPhotoService.create(createProjectPhotoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all project photos' })
  @ApiResponse({ status: 200, description: 'List of all project photos', type: [ProjectPhoto] })
  findAll(): Promise<ProjectPhoto[]> {
    return this.projectPhotoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project photo by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Project photo ID' })
  @ApiResponse({ status: 200, description: 'Project photo found', type: ProjectPhoto })
  @ApiResponse({ status: 404, description: 'Project photo not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProjectPhoto> {
    return this.projectPhotoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project photo' })
  @ApiParam({ name: 'id', type: 'number', description: 'Project photo ID' })
  @ApiResponse({ status: 200, description: 'Project photo updated', type: ProjectPhoto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectPhotoDto: UpdateProjectPhotoDto,
  ): Promise<ProjectPhoto> {
    return this.projectPhotoService.update(id, updateProjectPhotoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project photo' })
  @ApiParam({ name: 'id', type: 'number', description: 'Project photo ID' })
  @ApiResponse({ status: 200, description: 'Project photo deleted' })
  @ApiResponse({ status: 404, description: 'Project photo not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.projectPhotoService.remove(id);
  }
}