import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class LimitQueryDto {
  @ApiProperty({
    description: 'Number of items to return',
    required: false,
    default: 5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit: number = 5;
}
