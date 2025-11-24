import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsLike } from './entities/news-like.entity';
import { CreateNewsLikeDto } from './dto/create-news-like.dto';
import { UpdateNewsLikeDto } from './dto/update-news-like.dto';

@Injectable()
export class NewsLikeService {
  private newsLikes: NewsLike[] = [];
  private idCounter = 1;

  async create(createNewsLikeDto: CreateNewsLikeDto): Promise<NewsLike> {
    const newsLike: NewsLike = {
      id: this.idCounter++,
      ...createNewsLikeDto,
      monitor: { id: createNewsLikeDto.monitorId } as any,
    };
    this.newsLikes.push(newsLike);
    return newsLike;
  }

  async findAll(): Promise<NewsLike[]> {
    return this.newsLikes;
  }

  async findOne(id: number): Promise<NewsLike> {
    const newsLike = this.newsLikes.find(f => f.id === id);
    if (!newsLike) {
      throw new NotFoundException(`NewsLike with ID ${id} not found`);
    }
    return newsLike;
  }

  async update(id: number, updateNewsLikeDto: UpdateNewsLikeDto): Promise<NewsLike> {
    const newsLike = await this.findOne(id);
    Object.assign(newsLike, updateNewsLikeDto);
    return newsLike;
  }

  async remove(id: number): Promise<void> {
    const index = this.newsLikes.findIndex(f => f.id === id);
    if (index === -1) {
      throw new NotFoundException(`NewsLike with ID ${id} not found`);
    }
    this.newsLikes.splice(index, 1);
  }

  async findByMonitorId(monitorId: number): Promise<NewsLike[]> {
    return this.newsLikes.filter(f => f.monitor.id === monitorId);
  }
}