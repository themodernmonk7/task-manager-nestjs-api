import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto, UpdateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('/api/notes')
export class NotesController {
  constructor(private readonly noteService: NotesService) {}
  // Create not

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createNoteDto: CreateNoteDto,
    @Request() req: { user: { sub: number } },
  ) {
    return this.noteService.create(createNoteDto, req.user.sub);
  }
  // Get all notes
  @UseGuards(AuthGuard)
  @Get()
  getAllNotes(@Request() req: { user: { sub: number } }) {
    return this.noteService.getAllNotes(req.user.sub);
  }

  // Get single note

  @UseGuards(AuthGuard)
  @Get(':id')
  getSingleNote(
    @Request() req: { user: { sub: number } },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.noteService.getSingleNote(id, req.user.sub);
  }
  // update note

  @UseGuards(AuthGuard)
  @Patch(':id')
  updateNote(
    @Body() updateNoteDto: UpdateNoteDto,
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: { sub: number } },
  ) {
    return this.noteService.updateNote(id, updateNoteDto, req.user.sub);
  }

  // Delete noted

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteNote(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: { sub: number } },
  ) {
    return this.noteService.deleteNote(id, req.user.sub);
  }
}
