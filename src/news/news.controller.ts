import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new news' })
  @ApiResponse({ status: 201, description: 'News created successfully', type: News })
  create(@Body() createNewsDto: CreateNewsDto): Promise<News> {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all news' })
  @ApiResponse({ status: 200, description: 'List of all news', type: [News] })
  findAll(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @Get('monitor/:monitorId')
  @ApiOperation({ summary: 'Get features by monitor ID' })
  @ApiParam({ name: 'monitorId', type: 'number', description: 'Monitor ID' })
  @ApiResponse({ status: 200, description: 'List of news for the monitor', type: [News] })
  findByMonitorId(@Param('monitorId', ParseIntPipe) monitorId: number): Promise<News[]> {
    return this.newsService.findByMonitorId(monitorId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get news by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'News ID' })
  @ApiResponse({ status: 200, description: 'Feature found', type: Feature })
  @ApiResponse({ status: 404, description: 'News not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<News> {
    return this.newsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update news' })
  @ApiParam({ name: 'id', type: 'number', description: 'News ID' })
  @ApiResponse({ status: 200, description: 'News updated', type: News })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNewsDto: UpdateNewsDto,
  ): Promise<News> {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete news' })
  @ApiParam({ name: 'id', type: 'number', description: 'News ID' })
  @ApiResponse({ status: 200, description: 'News deleted' })
  @ApiResponse({ status: 404, description: 'News not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.newsService.remove(id);
  }
}