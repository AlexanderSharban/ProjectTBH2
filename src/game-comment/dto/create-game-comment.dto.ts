import { ApiProperty } from '@nestjs/swagger';

export class CreateFeatureDto {
  @ApiProperty({ example: '27 inches', description: 'Screen diagonal size' })
  screenSize: string;

  @ApiProperty({ example: '1920x1080', description: 'Screen resolution' })
  resolution: string;

  @ApiProperty({ example: 144.00, description: 'Refresh rate in Hz' })
  refreshRate: number;

  @ApiProperty({ example: 1, description: 'ID of the parent monitor' })
  monitorId: number;
}