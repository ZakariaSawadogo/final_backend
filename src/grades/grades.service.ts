import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './grade.entity';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private repo: Repository<Grade>,
  ) {}

  // Initialiser une ligne de note (quand un élève arrive dans une classe)
  async initializeGrade(studentId: number, courseId: number) {
    const grade = this.repo.create({ student_id: studentId, course_id: courseId });
    return this.repo.save(grade);
  }

  // Mettre à jour les notes et recalculer la moyenne
  async updateGrade(id: number, notes: { devoir1?: number; devoir2?: number; composition?: number }) {
    const grade = await this.repo.findOneBy({ id });
    if (!grade) throw new NotFoundException('Grade not found');

    // Mise à jour des valeurs si elles sont fournies
    if (notes.devoir1 !== undefined) grade.devoir1 = notes.devoir1;
    if (notes.devoir2 !== undefined) grade.devoir2 = notes.devoir2;
    if (notes.composition !== undefined) grade.composition = notes.composition;

    // --- CALCUL DE LA MOYENNE (Logique Ouest-Africaine / Française) ---
    // Moyenne Devoirs = (D1 + D2) / 2
    // Moyenne Matière = (Moyenne Devoirs + Compo) / 2

    // On gère les cas où une note manque (on considère 0 ou on ignore)
    const d1 = grade.devoir1 || 0;
    const d2 = grade.devoir2 || 0;
    const compo = grade.composition || 0;

    const moyDevoirs = (d1 + d2) / 2;
    grade.average = (moyDevoirs + compo) / 2;

    return this.repo.save(grade);
  }

  // Récupérer les notes d'un élève
  findByStudent(studentId: number) {
    return this.repo.find({
      where: { student_id: studentId },
      relations: ['course'],
    });
  }
}