import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type QuizDocument = HydratedDocument<Quiz>;

@Schema({ timestamps: true })
export class Quiz {
  @ApiProperty({ example: 'Unit 2 Exam' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ example: 'Physics' })
  @Prop({ required: true })
  course: string;

  @ApiProperty({ example: '2025-11-20T10:00:00Z' })
  @Prop({ required: true })
  dueDate: Date;

  @ApiProperty({ example: 'Assignment' })
  @Prop({ required: true, enum: ['Quiz', 'Assignment'] })
  type: string;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
