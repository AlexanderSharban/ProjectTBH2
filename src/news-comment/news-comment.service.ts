import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsComment } from './entities/news-comment.entity';
import { CreateNewsCommentDto } from './dto/create-news-comment.dto';
import { UpdateNewsCommentDto } from './dto/update-news-comment.dto';

@Injectable()
export class NewsCommentService {
  constructor(
    @InjectRepository(NewsComment)
    private newsCommentRepository: Repository<NewsComment>,
  ) {}

  async create(createNewsCommentDto: CreateNewsCommentDto): Promise<NewsComment> {
    const newsComment = this.newsCommentRepository.create(createNewsCommentDto);
    return this.newsCommentRepository.save(newsComment);
  }

  async findAll(): Promise<NewsComment[]> {
    return this.newsCommentRepository.find({ relations: ['user', 'news'] });
  }

  async findOne(id: number): Promise<NewsComment> {
    const newsComment = await this.newsCommentRepository.findOne({
      where: { id },
      relations: ['user', 'news'],
    });
    if (!newsComment) {
      throw new NotFoundException(`NewsComment with ID ${id} not found`);
    }
    return newsComment;
  }

  async update(id: number, updateNewsCommentDto: UpdateNewsCommentDto): Promise<NewsComment> {
    const newsComment = await this.findOne(id);
    Object.assign(newsComment, updateNewsCommentDto);
    return this.newsCommentRepository.save(newsComment);
  }

  async remove(id: number): Promise<void> {
    const newsComment = await this.findOne(id);
    await this.newsCommentRepository.remove(newsComment);
  }

  async findByNewsId(newsId: number): Promise<NewsComment[]> {
    return this.newsCommentRepository.find({
      where: { newsId },
      relations: ['user', 'news'],
      order: { createdAt: 'ASC' },
    });
  }
}