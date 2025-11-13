import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnnouncementDto {
  @ApiProperty({ description: "Author's name", example: 'Dr. Ahmad Mosally' })
  @IsString()
  @IsNotEmpty()
  authorName: string;

  @ApiProperty({
    description: "Author's title",
    example: 'School Management',
    required: false,
  })
  @IsString()
  @IsOptional()
  authorTitle: string;

  @ApiProperty({ description: 'Content of the announcement' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: "URL to author's avatar",
    example: 'https_avatar_url.png',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  avatarUrl: string;
}
