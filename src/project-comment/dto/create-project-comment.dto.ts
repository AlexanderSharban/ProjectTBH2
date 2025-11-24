import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectCommentDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  userId: number;

  @ApiProperty({ example: 1, description: 'Project ID' })
  projectId: number;

  @ApiProperty({ example: 'Great project!', description: 'Comment content' })
  content: string;
}