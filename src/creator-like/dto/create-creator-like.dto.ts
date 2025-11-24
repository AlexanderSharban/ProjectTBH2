import { ApiProperty } from '@nestjs/swagger';

export class CreateCreatorLikeDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  userId: number;

  @ApiProperty({ example: 1, description: 'Creator ID' })
  creatorId: number;
}