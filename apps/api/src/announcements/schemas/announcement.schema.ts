import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type AnnouncementDocument = HydratedDocument<Announcement>;

@Schema({ timestamps: true })
export class Announcement {
  @ApiProperty()
  @Prop({ required: true })
  authorName: string;

  @ApiProperty()
  @Prop()
  authorTitle: string;

  @ApiProperty()
  @Prop({ required: true })
  content: string;

  @ApiProperty()
  @Prop()
  avatarUrl: string;
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);
