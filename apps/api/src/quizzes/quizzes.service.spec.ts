import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { Quiz, QuizDocument } from './schemas/quiz.schema';
import { CreateQuizDto } from './dto/create-quiz.dto';

const mockQuiz: any = {
  _id: '1',
  title: 'Test Quiz',
  course: 'Testing 101',
  dueDate: new Date(),
  type: 'Quiz',
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

const mockQuizModel: MockModel = Object.assign(
  jest.fn().mockImplementation((dto) => ({
    ...dto,
    save: jest.fn().mockResolvedValue(mockQuiz),
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

describe('QuizzesService', () => {
  let service: QuizzesService;
  let model: Model<QuizDocument>;

  beforeEach(async () => {
    mockQuizModel.find.mockReturnValue({
      sort: mockQuizModel.sort,
      skip: mockQuizModel.skip,
      limit: mockQuizModel.limit,
      exec: mockQuizModel.exec,
    });
    mockQuizModel.findById.mockReturnValue({
      exec: mockQuizModel.exec,
    });
    mockQuizModel.findByIdAndUpdate.mockReturnValue({
      exec: mockQuizModel.exec,
    });
    mockQuizModel.findByIdAndDelete.mockReturnValue({
      exec: mockQuizModel.exec,
    });
    mockQuizModel.sort.mockReturnValue(mockQuizModel);
    mockQuizModel.skip.mockReturnValue(mockQuizModel);
    mockQuizModel.limit.mockReturnValue(mockQuizModel);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizzesService,
        {
          provide: getModelToken(Quiz.name),
          useValue: mockQuizModel,
        },
      ],
    }).compile();

    service = module.get<QuizzesService>(QuizzesService);
    model = module.get<Model<QuizDocument>>(getModelToken(Quiz.name));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new quiz', async () => {
      const createDto: CreateQuizDto = {
        title: 'Test Quiz',
        course: 'Testing 101',
        dueDate: new Date(),
        type: 'Quiz',
      };

      const saveMock = jest.fn().mockResolvedValue(mockQuiz);
      (mockQuizModel as any).mockImplementationOnce(() => ({
        ...createDto,
        save: saveMock,
      }));

      const result = await service.create(createDto);

      expect(mockQuizModel).toHaveBeenCalledWith(createDto);
      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual(mockQuiz);
    });
  });

  describe('findAll', () => {
    it('should return paginated quizzes sorted by dueDate', async () => {
      mockQuizModel.exec.mockResolvedValue([mockQuiz]);
      mockQuizModel.countDocuments.mockResolvedValue(1);

      const result = await service.findAll({ page: 1, limit: 10 });

      expect(mockQuizModel.find).toHaveBeenCalled();
      expect(mockQuizModel.sort).toHaveBeenCalledWith({ dueDate: 1 });
      expect(mockQuizModel.skip).toHaveBeenCalledWith(0);
      expect(mockQuizModel.limit).toHaveBeenCalledWith(10);
      expect(mockQuizModel.countDocuments).toHaveBeenCalled();
      expect(result).toEqual({
        data: [mockQuiz],
        pagination: {
          page: 1,
          limit: 10,
          totalCount: 1,
          totalPages: 1,
        },
      });
    });
  });

  describe('findUpcoming', () => {
    it('should return N upcoming quizzes', async () => {
      mockQuizModel.exec.mockResolvedValue([mockQuiz]);

      const result = await service.findUpcoming(3);

      expect(mockQuizModel.find).toHaveBeenCalledWith({
        dueDate: { $gte: expect.any(Date) },
      });
      expect(mockQuizModel.sort).toHaveBeenCalledWith({ dueDate: 1 });
      expect(mockQuizModel.limit).toHaveBeenCalledWith(3);
      expect(result).toEqual([mockQuiz]);
    });
  });

  describe('findOne', () => {
    it('should find a quiz by ID', async () => {
      mockQuizModel.exec.mockResolvedValue(mockQuiz);

      const result = await service.findOne('1');

      expect(model.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockQuiz);
    });

    it('should throw NotFoundException if quiz not found', async () => {
      mockQuizModel.exec.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a quiz', async () => {
      const updateDto = { title: 'Updated Quiz' };
      mockQuizModel.exec.mockResolvedValue(mockQuiz);

      const result = await service.update('1', updateDto);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith('1', updateDto, {
        new: true,
      });
      expect(result).toEqual(mockQuiz);
    });

    it('should throw NotFoundException if quiz to update not found', async () => {
      mockQuizModel.exec.mockResolvedValue(null);

      await expect(service.update('1', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a quiz', async () => {
      mockQuizModel.exec.mockResolvedValue(mockQuiz);

      const result = await service.remove('1');

      expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(result).toEqual({
        message: 'Quiz with ID "1" successfully deleted',
      });
    });

    it('should throw NotFoundException if quiz to remove not found', async () => {
      mockQuizModel.exec.mockResolvedValue(null);

      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });
});
