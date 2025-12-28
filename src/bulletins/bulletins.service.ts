import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bulletin } from './bulletin.entity';
import { Grade } from '../grades/grade.entity';

@Injectable()
export class BulletinsService {
  constructor(
    @InjectRepository(Bulletin)
    private bulletinRepo: Repository<Bulletin>,
    @InjectRepository(Grade)
    private gradeRepo: Repository<Grade>,
  ) {}

  // --- FONCTION UTILITAIRE PRIVÉE ---
  private getCurrentAcademicYear(): string {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // Janvier = 1, Décembre = 12

    // Si on est en Août (8) ou après, c'est la nouvelle rentrée (ex: Sept 2025 -> 2025-2026)
    // Sinon (Janvier à Juillet), on est dans la fin de l'année précédente (ex: Mai 2026 -> 2025-2026)
    if (currentMonth >= 8) {
      return `${currentYear}-${currentYear + 1}`;
    } else {
      return `${currentYear - 1}-${currentYear}`;
    }
  }

  async generateBulletin(studentId: number, term: string, academicYear?: string) {
    // Utilise l'année fournie OU calcule l'année actuelle automatiquement
    const year = academicYear || this.getCurrentAcademicYear();

    // 1. Récupérer les notes DE CE TRIMESTRE seulement
    const grades = await this.gradeRepo.find({
      where: { student_id: studentId, term: term },
      relations: ['course'],
    });

    if (!grades.length) return { message: "Aucune note trouvée pour ce trimestre" };

    // 2. Calcul Moyenne Pondérée
    let totalPoints = 0;
    let totalCoefs = 0;

    for (const grade of grades) {
      if (grade.average !== null) {
        const coef = grade.course.coefficient || 1;
        totalPoints += grade.average * coef;
        totalCoefs += coef;
      }
    }

    const generalAverage = totalCoefs > 0 ? totalPoints / totalCoefs : 0;
    const status = generalAverage >= 10 ? 'PASSED' : 'WARNING';

    // 3. Sauvegarde
    let bulletin = await this.bulletinRepo.findOne({
      where: { student_id: studentId, academic_year: year, term: term },
    });

    if (!bulletin) {
      bulletin = this.bulletinRepo.create({
        student_id: studentId,
        academic_year: year,
        term: term,
      });
    }

    bulletin.general_average = parseFloat(generalAverage.toFixed(2));
    bulletin.status = status;

    return this.bulletinRepo.save(bulletin);
  }

  findByStudent(studentId: number) {
    return this.bulletinRepo.find({ where: { student_id: studentId } });
  }

  // Bonus : Moyenne Annuelle
  async getAnnualResult(studentId: number, year?: string) {
    const targetYear = year || this.getCurrentAcademicYear();

    const bulletins = await this.bulletinRepo.find({
      where: { student_id: studentId, academic_year: targetYear }
    });

    if (bulletins.length === 0) return { message: `Pas de bulletins pour l'année ${targetYear}` };

    const sumAverages = bulletins.reduce((sum, b) => sum + (b.general_average || 0), 0);
    const annualAverage = sumAverages / bulletins.length;

    return {
      studentId,
      academicYear: targetYear,
      annualAverage: parseFloat(annualAverage.toFixed(2)),
      decision: annualAverage >= 10 ? 'PASSAGE EN CLASSE SUPÉRIEURE' : 'REDOUBLEMENT',
      details: bulletins // Renvoie les bulletins T1, T2, T3 trouvés
    };
  }
}