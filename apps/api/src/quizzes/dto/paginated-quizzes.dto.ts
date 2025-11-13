import { ApiProperty } from '@nestjs/swagger';
import { Quiz } from '../schemas/quiz.schema';
import { PaginationMetaDto } from 'src/common/dto/pagination-query.dto';

export class PaginatedQuizzesDto {
  @ApiProperty({ type: [Quiz] })
  data: Quiz[];

  @ApiProperty({ type: PaginationMetaDto })
  pagination: PaginationMetaDto;
}
