import { ApiProperty } from '@nestjs/swagger';
import { Announcement } from '../schemas/announcement.schema';
import { PaginationMetaDto } from 'src/common/dto/pagination-query.dto';

export class PaginatedAnnouncementsDto {
  @ApiProperty({ type: [Announcement] })
  data: Announcement[];

  @ApiProperty({ type: PaginationMetaDto })
  pagination: PaginationMetaDto;
}
