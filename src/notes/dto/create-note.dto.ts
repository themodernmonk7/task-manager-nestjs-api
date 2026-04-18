import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;
}

export class UpdateNoteDto extends PartialType(CreateNoteDto) {}
