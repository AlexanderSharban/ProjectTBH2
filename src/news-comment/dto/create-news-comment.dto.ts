import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsCommentDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  userId: number;

  @ApiProperty({ example: 1, description: 'News ID' })
  newsId: number;

  @ApiProperty({ example: 'Great news!', description: 'Comment content' })
  content: string;
}