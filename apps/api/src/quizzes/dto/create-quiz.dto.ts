import { IsString, IsNotEmpty, IsEnum, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum QuizType {
  Quiz = 'Quiz',
  Assignment = 'Assignment',
}

export class CreateQuizDto {
  @ApiProperty({
    description: 'Title of the quiz/assignment',
    example: 'Unit 2 Exam',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Course name', example: 'Physics' })
  @IsString()
  @IsNotEmpty()
  course: string;

  @ApiProperty({
    description: 'Due date in ISO format',
    example: '2025-11-20T10:00:00Z',
  })
  @IsDate()
  dueDate: Date;

  @ApiProperty({ description: 'Type of item', enum: QuizType, example: 'Quiz' })
  @IsEnum(QuizType)
  type: string;
}
