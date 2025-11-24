import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectPhotoDto {
  @ApiProperty({ example: 1, description: 'Project ID' })
  projectId: number;

  @ApiProperty({ example: 'https://example.com/photo.jpg', description: 'Photo URL' })
  url: string;

  @ApiProperty({ example: 'Main project photo', description: 'Description', required: false })
  description?: string;

  @ApiProperty({ example: false, description: 'Is primary photo', required: false })
  isPrimary?: boolean;
}