import { Controller, Get, Post, Patch, Body, Param, ParseIntPipe } from '@nestjs/common';
import { GradesService } from './grades.service';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post('initialize')
  initialize(@Body() body: { studentId: number; courseId: number }) {
    return this.gradesService.initializeGrade(body.studentId, body.courseId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { devoir1?: number; devoir2?: number; composition?: number }
  ) {
    return this.gradesService.updateGrade(id, body);
  }

  @Get('student/:studentId')
  findByStudent(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.gradesService.findByStudent(studentId);
  }

  @Get('result/:studentId')
  getResult(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.gradesService.getStudentResult(studentId);
  }
}