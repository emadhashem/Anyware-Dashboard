import { IsOptional, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiProperty({
    description: 'Number of items per page',
    required: false,
    default: 10,
  })
  @IsOptional()
  @IsPositive()
  limit: number = 10;

  @ApiProperty({
    description: 'Current page number',
    required: false,
    default: 1,
  })
  @IsOptional()
  @Min(1)
  page: number = 1;
}

export class PaginationMetaDto {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 100 })
  totalCount: number;

  @ApiProperty({ example: 10 })
  totalPages: number;
}
