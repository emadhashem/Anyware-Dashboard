import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import {
  Announcement,
  AnnouncementDocument,
} from './schemas/announcement.schema';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectModel(Announcement.name)
    private readonly announcementModel: Model<AnnouncementDocument>,
  ) {}

  async create(
    createAnnouncementDto: CreateAnnouncementDto,
  ): Promise<Announcement> {
    const newAnnouncement = new this.announcementModel(createAnnouncementDto);
    return newAnnouncement.save();
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, page } = paginationQuery;
    const skip = (page - 1) * limit;

    const [announcements, totalCount] = await Promise.all([
      this.announcementModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.announcementModel.countDocuments(),
    ]);

    return {
      data: announcements,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }

  async findLatest(limit: number): Promise<Announcement[]> {
    return this.announcementModel
      .find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  async findOne(id: string): Promise<Announcement> {
    const announcement = await this.announcementModel.findById(id).exec();
    if (!announcement) {
      throw new NotFoundException(`Announcement with ID "${id}" not found`);
    }
    return announcement;
  }

  async update(
    id: string,
    updateAnnouncementDto: UpdateAnnouncementDto,
  ): Promise<Announcement> {
    const existingAnnouncement = await this.announcementModel
      .findByIdAndUpdate(id, updateAnnouncementDto, { new: true })
      .exec();

    if (!existingAnnouncement) {
      throw new NotFoundException(`Announcement with ID "${id}" not found`);
    }
    return existingAnnouncement;
  }

  async remove(id: string): Promise<any> {
    const result = await this.announcementModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Announcement with ID "${id}" not found`);
    }
    return { message: `Announcement with ID "${id}" successfully deleted` };
  }
}
