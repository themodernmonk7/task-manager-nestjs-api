import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateNoteDto, UpdateNoteDto } from './dto/create-note.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NotesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createNoteDto: CreateNoteDto, userId: number) {
    if (!createNoteDto.title || !createNoteDto.body) {
      throw new ConflictException('All data is required');
    }
    const data = {
      title: createNoteDto.title,
      body: createNoteDto.body,
      userId: userId,
    };
    const note = await this.prismaService.note.create({
      data,
    });

    return note;
  }

  async getAllNotes(userId: number) {
    if (!userId) {
      throw new ConflictException('user not found');
    }

    const notes = await this.prismaService.note.findMany({
      where: {
        userId: userId,
      },
    });

    return notes;
  }

  async getSingleNote(id: number, userId: number) {
    if (!userId) {
      throw new ConflictException('user not found');
    }

    const note = await this.prismaService.note.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!note) {
      throw new NotFoundException('Not found');
    }

    return note;
  }

  async updateNote(id: number, updateNoteDto: UpdateNoteDto, userId: number) {
    if (!userId) {
      throw new UnauthorizedException('Unauthorized to access.');
    }

    const note = await this.prismaService.note.findFirst({
      where: { id },
    });

    console.log(note);

    if (note?.userId !== userId) {
      throw new ForbiddenException('Not allowed');
    }

    if (!note) {
      throw new NotFoundException('Not found');
    }

    const updateNote = await this.prismaService.note.update({
      where: {
        id,
      },
      data: updateNoteDto,
    });

    return updateNote;
  }

  async deleteNote(id: number, userId: number) {
    if (!userId) {
      throw new UnauthorizedException('Unauthorized to access');
    }

    return await this.prismaService.note.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
