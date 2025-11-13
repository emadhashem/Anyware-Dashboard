import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { Announcement } from './schemas/announcement.schema';
import { PaginatedAnnouncementsDto } from './dto/paginated-announcements.dto';
import { LimitQueryDto } from 'src/common/dto/limit-query.dto';

@ApiTags('Announcements')
@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new announcement' })
  @ApiCreatedResponse({
    description: 'The announcement has been successfully created.',
    type: Announcement,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data.',
    type: ErrorResponseDto,
  })
  create(@Body() createAnnouncementDto: CreateAnnouncementDto) {
    return this.announcementsService.create(createAnnouncementDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all announcements with pagination' })
  @ApiOkResponse({
    description: 'List of announcements with pagination.',
    type: PaginatedAnnouncementsDto,
  })
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.announcementsService.findAll(paginationQuery);
  }

  @Get('latest')
  @ApiOperation({ summary: 'Get the N most recent announcements' })
  @ApiOkResponse({
    description: 'A list of recent announcements.',
    type: [Announcement],
  })
  findLatest(@Query() limitQuery: LimitQueryDto) {
    return this.announcementsService.findLatest(limitQuery.limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an announcement by ID' })
  @ApiOkResponse({
    description: 'The found announcement.',
    type: Announcement,
  })
  @ApiNotFoundResponse({
    description: 'Announcement not found.',
    type: ErrorResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.announcementsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an announcement by ID' })
  @ApiOkResponse({
    description: 'The updated announcement.',
    type: Announcement,
  })
  @ApiNotFoundResponse({
    description: 'Announcement not found.',
    type: ErrorResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data.',
    type: ErrorResponseDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto,
  ) {
    return this.announcementsService.update(id, updateAnnouncementDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an announcement by ID' })
  @ApiOkResponse({
    description: 'Announcement successfully deleted.',
    schema: {
      example: { message: 'Announcement with ID "..." successfully deleted' },
    },
  })
  @ApiNotFoundResponse({
    description: 'Announcement not found.',
    type: ErrorResponseDto,
  })
  remove(@Param('id') id: string) {
    return this.announcementsService.remove(id);
  }
}
