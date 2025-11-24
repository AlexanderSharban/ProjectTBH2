import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsComment } from './entities/news-comment.entity';
import { CreateNewsCommentDto } from './dto/create-news-comment.dto';
import { UpdateNewsCommentDto } from './dto/update-news-comment.dto';

@Injectable()
export class NewsCommentService {
  private newsComments: NewsComment[] = [];
  private idCounter = 1;

  async create(createNewsCommentDto: CreateNewsCommentDto): Promise<NewsComment> {
    const newsComment: NewsComment = {
      id: this.idCounter++,
      ...createNewsCommentDto,
      news: { id: createNewsCommentDto.newsId } as any,
    } as any;
    this.newsComments.push(newsComment);
    return newsComment;
  }

  async findAll(): Promise<NewsComment[]> {
    return this.newsComments;
  }

  async findOne(id: number): Promise<NewsComment> {
    const newsComment = this.newsComments.find(f => f.id === id);
    if (!newsComment) {
      throw new NotFoundException(`NewsComment with ID ${id} not found`);
    }
    return newsComment;
  }

  async update(id: number, updateNewsCommentDto: UpdateNewsCommentDto): Promise<NewsComment> {
    const newsComment = await this.findOne(id);
    Object.assign(newsComment, updateNewsCommentDto);
    return newsComment;
  }

  async remove(id: number): Promise<void> {
    const index = this.newsComments.findIndex(f => f.id === id);
    if (index === -1) {
      throw new NotFoundException(`NewsComment with ID ${id} not found`);
    }
    this.newsComments.splice(index, 1);
  }

  
}