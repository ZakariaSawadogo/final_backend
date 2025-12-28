import { Controller, Get, Post, Patch, Body, Param, ParseIntPipe } from '@nestjs/common';
import { GradesService } from './grades.service';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  // Initialiser une note vide pour un élève dans un cours
  @Post('initialize')
  initialize(@Body() body: { studentId: number; courseId: number }) {
    return this.gradesService.initializeGrade(body.studentId, body.courseId);
  }

  // Mettre à jour les notes (Devoirs ou Compo)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { devoir1?: number; devoir2?: number; composition?: number }
  ) {
    return this.gradesService.updateGrade(id, body);
  }

  // Voir les notes d'un élève spécifique
  @Get('student/:studentId')
  findByStudent(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.gradesService.findByStudent(studentId);
  }
}