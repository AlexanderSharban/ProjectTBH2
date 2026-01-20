import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectPhotoCommentDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  userId: number;

  @ApiProperty({ example: 1, description: 'Project Photo ID' })
  projectPhotoId: number;

  @ApiProperty({ example: 'Great photo!', description: 'Comment content' })
  content: string;
}