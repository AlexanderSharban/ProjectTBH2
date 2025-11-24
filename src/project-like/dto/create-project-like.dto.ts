import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectLikeDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  userId: number;

  @ApiProperty({ example: 1, description: 'Project ID' })
  projectId: number;
}