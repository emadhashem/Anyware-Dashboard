import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import {
  Announcement,
  AnnouncementDocument,
} from './schemas/announcement.schema';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

const mockAnnouncement: any = {
  _id: '1',
  authorName: 'Dr. Test',
  authorTitle: 'Tester',
  content: 'This is a test announcement.',
  avatarUrl: 'http://avatar.url',
  createdAt: new Date(),
  updatedAt: new Date(),
};

type MockModel<T = any> = {
  new (dto?: Partial<T>): {
    save: jest.Mock;
  };
  find: jest.Mock;
  findById: jest.Mock;
  findByIdAndUpdate: jest.Mock;
  findByIdAndDelete: jest.Mock;
  countDocuments: jest.Mock;
  sort: jest.Mock;
  skip: jest.Mock;
  limit: jest.Mock;
  exec: jest.Mock;
};

const mockAnnouncementModel: MockModel = Object.assign(
  jest.fn().mockImplementation((dto) => ({
    ...dto,
    save: jest.fn().mockResolvedValue(mockAnnouncement),
  })),
  {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    countDocuments: jest.fn(),
    sort: jest.fn(),
    skip: jest.fn(),
    limit: jest.fn(),
    exec: jest.fn(),
  },
);

describe('AnnouncementsService', () => {
  let service: AnnouncementsService;
  let model: Model<AnnouncementDocument>;

  beforeEach(async () => {
    mockAnnouncementModel.find.mockReturnValue({
      sort: mockAnnouncementModel.sort,
      skip: mockAnnouncementModel.skip,
      limit: mockAnnouncementModel.limit,
      exec: mockAnnouncementModel.exec,
    });
    mockAnnouncementModel.findById.mockReturnValue({
      exec: mockAnnouncementModel.exec,
    });
    mockAnnouncementModel.findByIdAndUpdate.mockReturnValue({
      exec: mockAnnouncementModel.exec,
    });
    mockAnnouncementModel.findByIdAndDelete.mockReturnValue({
      exec: mockAnnouncementModel.exec,
    });
    mockAnnouncementModel.sort.mockReturnValue(mockAnnouncementModel);
    mockAnnouncementModel.skip.mockReturnValue(mockAnnouncementModel);
    mockAnnouncementModel.limit.mockReturnValue(mockAnnouncementModel);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnnouncementsService,
        {
          provide: getModelToken(Announcement.name),
          useValue: mockAnnouncementModel,
        },
      ],
    }).compile();

    service = module.get<AnnouncementsService>(AnnouncementsService);
    model = module.get<Model<AnnouncementDocument>>(
      getModelToken(Announcement.name),
    );

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new announcement', async () => {
      const createDto: CreateAnnouncementDto = {
        authorName: 'Dr. Test',
        authorTitle: 'Tester',
        content: 'This is a test announcement.',
      };

      const saveMock = jest.fn().mockResolvedValue(mockAnnouncement);
      (mockAnnouncementModel as any).mockImplementationOnce(() => ({
        ...createDto,
        save: saveMock,
      }));

      const result = await service.create(createDto);

      expect(mockAnnouncementModel).toHaveBeenCalledWith(createDto);
      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual(mockAnnouncement);
    });
  });

  describe('findAll', () => {
    it('should return paginated announcements', async () => {
      mockAnnouncementModel.exec.mockResolvedValue([mockAnnouncement]);
      mockAnnouncementModel.countDocuments.mockResolvedValue(1);

      const result = await service.findAll({ page: 1, limit: 10 });

      expect(mockAnnouncementModel.find).toHaveBeenCalled();
      expect(mockAnnouncementModel.sort).toHaveBeenCalledWith({
        createdAt: -1,
      });
      expect(mockAnnouncementModel.skip).toHaveBeenCalledWith(0);
      expect(mockAnnouncementModel.limit).toHaveBeenCalledWith(10);
      expect(mockAnnouncementModel.countDocuments).toHaveBeenCalled();
      expect(result).toEqual({
        data: [mockAnnouncement],
        pagination: {
          page: 1,
          limit: 10,
          totalCount: 1,
          totalPages: 1,
        },
      });
    });
  });

  describe('findLatest', () => {
    it('should return N latest announcements', async () => {
      mockAnnouncementModel.exec.mockResolvedValue([mockAnnouncement]);

      const result = await service.findLatest(5);

      expect(mockAnnouncementModel.find).toHaveBeenCalled();
      expect(mockAnnouncementModel.sort).toHaveBeenCalledWith({
        createdAt: -1,
      });
      expect(mockAnnouncementModel.limit).toHaveBeenCalledWith(5);
      expect(result).toEqual([mockAnnouncement]);
    });
  });

  describe('findOne', () => {
    it('should find an announcement by ID', async () => {
      mockAnnouncementModel.exec.mockResolvedValue(mockAnnouncement);

      const result = await service.findOne('1');

      expect(model.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockAnnouncement);
    });

    it('should throw NotFoundException if not found', async () => {
      mockAnnouncementModel.exec.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an announcement', async () => {
      const updateDto: Partial<CreateAnnouncementDto> = { content: 'Updated' };
      mockAnnouncementModel.exec.mockResolvedValue(mockAnnouncement);

      const result = await service.update('1', updateDto);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith('1', updateDto, {
        new: true,
      });
      expect(result).toEqual(mockAnnouncement);
    });

    it('should throw NotFoundException if not found', async () => {
      mockAnnouncementModel.exec.mockResolvedValue(null);

      await expect(service.update('1', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an announcement', async () => {
      mockAnnouncementModel.exec.mockResolvedValue(mockAnnouncement);

      const result = await service.remove('1');

      expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(result).toEqual({
        message: 'Announcement with ID "1" successfully deleted',
      });
    });

    it('should throw NotFoundException if not found', async () => {
      mockAnnouncementModel.exec.mockResolvedValue(null);

      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });
});
