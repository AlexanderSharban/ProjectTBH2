import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsLike } from './entities/news-like.entity';
import { CreateNewsLikeDto } from './dto/create-news-like.dto';
import { UpdateNewsLikeDto } from './dto/update-news-like.dto';

@Injectable()
export class NewsLikeService {
  constructor(
    @InjectRepository(NewsLike)
    private newsLikeRepository: Repository<NewsLike>,
  ) {}

  async create(createNewsLikeDto: CreateNewsLikeDto): Promise<NewsLike> {
    const newsLike = this.newsLikeRepository.create(createNewsLikeDto);
    return this.newsLikeRepository.save(newsLike);
  }

  async findAll(): Promise<NewsLike[]> {
    return this.newsLikeRepository.find({ relations: ['user', 'news'] });
  }

  async findOne(id: number): Promise<NewsLike> {
    const newsLike = await this.newsLikeRepository.findOne({
      where: { id },
      relations: ['user', 'news'],
    });
    if (!newsLike) {
      throw new NotFoundException(`NewsLike with ID ${id} not found`);
    }
    return newsLike;
  }

  async update(id: number, updateNewsLikeDto: UpdateNewsLikeDto): Promise<NewsLike> {
    const newsLike = await this.findOne(id);
    Object.assign(newsLike, updateNewsLikeDto);
    return this.newsLikeRepository.save(newsLike);
  }

  async remove(id: number): Promise<void> {
    const newsLike = await this.findOne(id);
    await this.newsLikeRepository.remove(newsLike);
  }

  async findByNewsId(newsId: number): Promise<NewsLike[]> {
    return this.newsLikeRepository.find({
      where: { newsId },
      relations: ['user', 'news'],
    });
  }

  async findByUserAndNews(userId: number, newsId: number): Promise<NewsLike | null> {
    return this.newsLikeRepository.findOne({
      where: { userId, newsId },
    });
  }
}