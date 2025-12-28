import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { BulletinsService } from './bulletins.service';

@Controller('bulletins')
export class BulletinsController {
  constructor(private readonly bulletinsService: BulletinsService) {}

  @Post('generate')
  generate(@Body() body: { studentId: number; academicYear?: string; term?: string }) {
    // academicYear est maintenant optionnel (?)
    return this.bulletinsService.generateBulletin(body.studentId, body.term || 'T1', body.academicYear);
  }

  @Get('student/:studentId')
  findByStudent(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.bulletinsService.findByStudent(studentId);
  }

  // Pour la moyenne annuelle, on peut aussi rendre l'année optionnelle
  @Get('annual-result/:studentId') // J'ai retiré /:year de l'URL obligatoire
  getAnnualResult(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Body('year') year?: string // On peut le passer dans le body ou le laisser vide
  ) {
    return this.bulletinsService.getAnnualResult(studentId, year);
  }
}