import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly service: CoursesService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Get('teacher/:id')
  findByTeacher(@Param('id', ParseIntPipe) id: number) { return this.service.findByTeacher(id); }

  @Get('class/:id')
  findByClass(@Param('id', ParseIntPipe) id: number) { return this.service.findByClass(id); }

  @Post()
  create(@Body() body: any) { return this.service.create(body); }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) { return this.service.update(id, body); }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}