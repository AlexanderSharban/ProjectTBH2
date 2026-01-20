import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { NewsCommentService } from './news-comment.service';
import { CreateNewsCommentDto } from './dto/create-news-comment.dto';
import { UpdateNewsCommentDto } from './dto/update-news-comment.dto';
import { NewsComment } from './entities/news-comment.entity';

@ApiTags('news-comments')
@Controller('news-comments')
export class NewsCommentController {
  constructor(private readonly newsCommentService: NewsCommentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new news comment' })
  @ApiResponse({ status: 201, description: 'News comment created successfully', type: NewsComment })
  create(@Body() createNewsCommentDto: CreateNewsCommentDto): Promise<NewsComment> {
    return this.newsCommentService.create(createNewsCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all news comments' })
  @ApiResponse({ status: 200, description: 'List of all news comments', type: [NewsComment] })
  findAll(): Promise<NewsComment[]> {
    return this.newsCommentService.findAll();
  }

  @Get('news/:newsId')
  @ApiOperation({ summary: 'Get comments by news ID' })
  @ApiParam({ name: 'newsId', type: 'number' })
  findByNewsId(@Param('newsId', ParseIntPipe) newsId: number): Promise<NewsComment[]> {
    return this.newsCommentService.findByNewsId(newsId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get news comment by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'News comment ID' })
  @ApiResponse({ status: 200, description: 'News comment found', type: NewsComment })
  @ApiResponse({ status: 404, description: 'News comment not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<NewsComment> {
    return this.newsCommentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update news comment' })
  @ApiParam({ name: 'id', type: 'number', description: 'News comment ID' })
  @ApiResponse({ status: 200, description: 'News comment updated', type: NewsComment })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNewsCommentDto: UpdateNewsCommentDto,
  ): Promise<NewsComment> {
    return this.newsCommentService.update(id, updateNewsCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete news comment' })
  @ApiParam({ name: 'id', type: 'number', description: 'News comment ID' })
  @ApiResponse({ status: 200, description: 'News comment deleted' })
  @ApiResponse({ status: 404, description: 'News comment not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.newsCommentService.remove(id);
  }
}