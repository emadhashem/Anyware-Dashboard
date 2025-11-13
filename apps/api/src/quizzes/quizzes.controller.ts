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
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
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
import { Quiz } from './schemas/quiz.schema';
import { PaginatedQuizzesDto } from './dto/paginated-quizzes.dto';
import { LimitQueryDto } from 'src/common/dto/limit-query.dto';

@ApiTags('Quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quiz or assignment' })
  @ApiCreatedResponse({
    description: 'The quiz has been successfully created.',
    type: Quiz,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data.',
    type: ErrorResponseDto,
  })
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(createQuizDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all quizzes/assignments with pagination' })
  @ApiOkResponse({
    description: 'List of quizzes/assignments with pagination.',
    type: PaginatedQuizzesDto,
  })
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.quizzesService.findAll(paginationQuery);
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Get the N upcoming quizzes/assignments' })
  @ApiOkResponse({
    description: 'A list of upcoming quizzes/assignments.',
    type: [Quiz],
  })
  findUpcoming(@Query() limitQuery: LimitQueryDto) {
    return this.quizzesService.findUpcoming(limitQuery.limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a quiz/assignment by ID' })
  @ApiOkResponse({
    description: 'The found quiz/assignment.',
    type: Quiz,
  })
  @ApiNotFoundResponse({
    description: 'Quiz/assignment not found.',
    type: ErrorResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.quizzesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a quiz/assignment by ID' })
  @ApiOkResponse({
    description: 'The updated quiz/assignment.',
    type: Quiz,
  })
  @ApiNotFoundResponse({
    description: 'Quiz/assignment not found.',
    type: ErrorResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data.',
    type: ErrorResponseDto,
  })
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizzesService.update(id, updateQuizDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a quiz/assignment by ID' })
  @ApiOkResponse({
    description: 'Quiz/assignment successfully deleted.',
    schema: {
      example: { message: 'Quiz with ID "..." successfully deleted' },
    },
  })
  @ApiNotFoundResponse({
    description: 'Quiz/assignment not found.',
    type: ErrorResponseDto,
  })
  remove(@Param('id') id: string) {
    return this.quizzesService.remove(id);
  }
}
