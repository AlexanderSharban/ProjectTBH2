import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectPhotoLikeDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  userId: number;

  @ApiProperty({ example: 1, description: 'Project photo ID' })
  projectPhotoId: number;
}