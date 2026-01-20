import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { NewsLikeService } from './news-like.service';
import { CreateNewsLikeDto } from './dto/create-news-like.dto';
import { UpdateNewsLikeDto } from './dto/update-news-like.dto';
import { NewsLike } from './entities/news-like.entity';

@ApiTags('news-likes')
@Controller('news-likes')
export class NewsLikeController {
  constructor(private readonly newsLikeService: NewsLikeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new news like' })
  @ApiResponse({ status: 201, description: 'News like created successfully', type: NewsLike })
  create(@Body() createNewsLikeDto: CreateNewsLikeDto): Promise<NewsLike> {
    return this.newsLikeService.create(createNewsLikeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all news likes' })
  @ApiResponse({ status: 200, description: 'List of all news likes', type: [NewsLike] })
  findAll(): Promise<NewsLike[]> {
    return this.newsLikeService.findAll();
  }

  @Get('news/:newsId')
  @ApiOperation({ summary: 'Get likes by news ID' })
  @ApiParam({ name: 'newsId', type: 'number' })
  findByNewsId(@Param('newsId', ParseIntPipe) newsId: number): Promise<NewsLike[]> {
    return this.newsLikeService.findByNewsId(newsId);
  }
  

  @Get(':id')
  @ApiOperation({ summary: 'Get news like by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'News like ID' })
  @ApiResponse({ status: 200, description: 'News like found', type: NewsLike })
  @ApiResponse({ status: 404, description: 'News like not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<NewsLike> {
    return this.newsLikeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update news like' })
  @ApiParam({ name: 'id', type: 'number', description: 'News like ID' })
  @ApiResponse({ status: 200, description: 'News like updated', type: NewsLike })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNewsLikeDto: UpdateNewsLikeDto,
  ): Promise<NewsLike> {
    return this.newsLikeService.update(id, updateNewsLikeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete news like' })
  @ApiParam({ name: 'id', type: 'number', description: 'News like ID' })
  @ApiResponse({ status: 200, description: 'News like deleted' })
  @ApiResponse({ status: 404, description: 'News like not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.newsLikeService.remove(id);
  }
}