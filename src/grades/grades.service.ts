import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './grade.entity';
import { StudentResult } from './student-result.entity';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade) private gradeRepo: Repository<Grade>,
    @InjectRepository(StudentResult) private resultRepo: Repository<StudentResult>,
  ) {}

  async initializeGrade(studentId: number, courseId: number) {
    let grade = await this.gradeRepo.findOne({ where: { student_id: studentId, course_id: courseId } });
    if (!grade) {
      grade = this.gradeRepo.create({ student_id: studentId, course_id: courseId });
      return this.gradeRepo.save(grade);
    }
    return grade;
  }

  async updateGrade(id: number, notes: any) {
    const grade = await this.gradeRepo.findOne({ where: { id }, relations: ['course'] });
    if (!grade) throw new BadRequestException('Note introuvable');

    const parse = (val: any) => (val === '' || val === null) ? null : parseFloat(val);

    if (notes.devoir1 !== undefined) grade.devoir1 = parse(notes.devoir1);
    if (notes.devoir2 !== undefined) grade.devoir2 = parse(notes.devoir2);
    if (notes.composition !== undefined) grade.composition = parse(notes.composition);

    const check = (n: number | null) => n !== null && (n < 0 || n > 20);
    if (check(grade.devoir1) || check(grade.devoir2) || check(grade.composition)) {
      throw new BadRequestException('Notes invalides (0-20)');
    }

    const d1 = grade.devoir1 || 0;
    const d2 = grade.devoir2 || 0;
    const compo = grade.composition || 0;
    // Formule: (MoyDev + Compo) / 2
    grade.average = ((d1 + d2) / 2 + compo) / 2;

    await this.gradeRepo.save(grade);
    await this.calculateGeneralAverage(grade.student_id);

    return grade;
  }

  async calculateGeneralAverage(studentId: number) {
    const grades = await this.gradeRepo.find({ where: { student_id: studentId }, relations: ['course'] });
    let total = 0, coefs = 0;
    grades.forEach(g => {
      if (g.average !== null) {
        const c = g.course.coefficient || 1;
        total += g.average * c;
        coefs += c;
      }
    });
    const avg = coefs > 0 ? total / coefs : 0;

    let res = await this.resultRepo.findOneBy({ student_id: studentId });
    if (!res) res = this.resultRepo.create({ student_id: studentId });
    res.general_average = parseFloat(avg.toFixed(2));
    await this.resultRepo.save(res);
  }

  findByStudent(studentId: number) {
    return this.gradeRepo.find({ where: { student_id: studentId }, relations: ['course'] });
  }

  getStudentResult(studentId: number) {
    return this.resultRepo.findOneBy({ student_id: studentId });
  }
}