import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() body: { name: string;
      coefficient: number;
      class_level_id: number;
      teacher_id: number
  }) {
    return this.coursesService.create(body.name,
      body.coefficient,
      body.class_level_id,
      body.teacher_id);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get('teacher/:teacherId')
  findByTeacher(@Param('teacherId', ParseIntPipe) teacherId: number) {
    return this.coursesService.findByTeacher(teacherId);
  }
}