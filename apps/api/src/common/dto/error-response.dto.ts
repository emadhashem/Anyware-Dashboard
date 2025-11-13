import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: 'Announcement with ID "123" not found' })
  message: string | string[];

  @ApiProperty({ example: '2025-11-10T15:00:00.000Z' })
  timestamp: string;

  @ApiProperty({ example: '/announcements/123' })
  path: string;
}
