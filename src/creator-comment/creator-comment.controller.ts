import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreatorCommentService } from './creator-comment.service';
import { CreateCreatorCommentDto } from './dto/create-creator-comment.dto';
import { UpdateCreatorCommentDto } from './dto/update-creator-comment.dto';
import { CreatorComment } from './entities/creator-comment.entity';

@ApiTags('creator-comments')
@Controller('creator-comments')
export class CreatorCommentController {
  constructor(private readonly creatorCommentService: CreatorCommentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new creator comment' })
  @ApiResponse({ status: 201, description: 'Creator comment created successfully', type: CreatorComment })
  create(@Body() createCreatorCommentDto: CreateCreatorCommentDto): Promise<CreatorComment> {
    return this.creatorCommentService.create(createCreatorCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all creator comments' })
  @ApiResponse({ status: 200, description: 'List of all creator comments', type: [CreatorComment] })
  findAll(): Promise<CreatorComment[]> {
    return this.creatorCommentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get creator comment by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Creator comment ID' })
  @ApiResponse({ status: 200, description: 'Creator comment found', type: CreatorComment })
  @ApiResponse({ status: 404, description: 'Creator comment not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CreatorComment> {
    return this.creatorCommentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update creator comment' })
  @ApiParam({ name: 'id', type: 'number', description: 'Creator comment ID' })
  @ApiResponse({ status: 200, description: 'Creator comment updated', type: CreatorComment })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCreatorCommentDto: UpdateCreatorCommentDto,
  ): Promise<CreatorComment> {
    return this.creatorCommentService.update(id, updateCreatorCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete creator comment' })
  @ApiParam({ name: 'id', type: 'number', description: 'Creator comment ID' })
  @ApiResponse({ status: 200, description: 'Creator comment deleted' })
  @ApiResponse({ status: 404, description: 'Creator comment not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.creatorCommentService.remove(id);
  }
}