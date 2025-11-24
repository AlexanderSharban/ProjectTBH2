import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsLikeDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  userId: number;

  @ApiProperty({ example: 1, description: 'News ID' })
  newsId: number;
}