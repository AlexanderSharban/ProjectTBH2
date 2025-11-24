import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({ example: 'News Title', description: 'News title' })
  title: string;

  @ApiProperty({ example: 'Full news content', description: 'Content' })
  content: string;

  @ApiProperty({ example: 'Short excerpt', description: 'Excerpt', required: false })
  excerpt?: string;

  @ApiProperty({ example: 'news-title', description: 'Unique slug', required: false })
  slug?: string;

  @ApiProperty({ example: 1, description: 'Creator ID' })
  creatorId: number;
}