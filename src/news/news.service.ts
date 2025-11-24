import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  private news: News[] = [];
  private idCounter = 1;

  async create(createNewsDto: CreateNewsDto): Promise<News> {
    const news: News = {
      id: this.idCounter++,
      ...createNewsDto,
      creatorId: createNewsDto.creatorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any;
    this.news.push(news);
    return news;
  }

  async findAll(): Promise<News[]> {
    return this.news;
  }

  async findOne(id: number): Promise<News> {
    const news = this.news.find(f => f.id === id);
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    return news;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto): Promise<News> {
    const news = await this.findOne(id);
    Object.assign(news, updateNewsDto);
    return news;
  }

  async remove(id: number): Promise<void> {
    const index = this.news.findIndex(f => f.id === id);
    if (index === -1) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    this.news.splice(index, 1);
  }

  
}