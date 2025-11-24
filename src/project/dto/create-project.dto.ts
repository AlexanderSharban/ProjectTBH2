import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'Project Title', description: 'Project title' })
  title: string;

  @ApiProperty({ example: 'Project description', description: 'Description', required: false })
  description?: string;

  @ApiProperty({ example: 'https://project.com', description: 'Project URL', required: false })
  projectUrl?: string;

  @ApiProperty({ example: 'https://github.com/project', description: 'Source code URL', required: false })
  sourceCodeUrl?: string;

  @ApiProperty({ example: false, description: 'Is featured?' })
  featured?: boolean;

  @ApiProperty({ example: 1, description: 'Creator ID' })
  creatorId: number;
}