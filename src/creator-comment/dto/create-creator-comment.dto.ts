import { ApiProperty } from '@nestjs/swagger';

export class CreateCreatorCommentDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  userId: number;

  @ApiProperty({ example: 1, description: 'Creator ID' })
  creatorId: number;

  @ApiProperty({ example: 'Nice work!', description: 'Comment content' })
  content: string;
}