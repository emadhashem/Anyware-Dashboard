import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Quiz, QuizDocument } from './schemas/quiz.schema';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Quiz.name)
    private readonly quizModel: Model<QuizDocument>,
  ) {}

  create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const newQuiz = new this.quizModel(createQuizDto);
    return newQuiz.save();
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, page } = paginationQuery;
    const skip = (page - 1) * limit;

    const [quizzes, totalCount] = await Promise.all([
      this.quizModel
        .find()
        .sort({ dueDate: 1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.quizModel.countDocuments(),
    ]);

    return {
      data: quizzes,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }

  async findUpcoming(limit: number): Promise<Quiz[]> {
    return this.quizModel
      .find({ dueDate: { $gte: new Date() } })
      .sort({ dueDate: 1 })
      .limit(limit)
      .exec();
  }

  async findOne(id: string): Promise<Quiz> {
    const quiz = await this.quizModel.findById(id).exec();
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID "${id}" not found`);
    }
    return quiz;
  }

  async update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const existingQuiz = await this.quizModel
      .findByIdAndUpdate(id, updateQuizDto, { new: true })
      .exec();

    if (!existingQuiz) {
      throw new NotFoundException(`Quiz with ID "${id}" not found`);
    }
    return existingQuiz;
  }

  async remove(id: string): Promise<any> {
    const result = await this.quizModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Quiz with ID "${id}" not found`);
    }
    return { message: `Quiz with ID "${id}" successfully deleted` };
  }
}
