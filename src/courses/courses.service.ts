import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private repo: Repository<Course>,
  ) {}

  create(name: string, coefficient: number, classLevelId: number, teacherId: number) {
    const course = this.repo.create({
      name,
      coefficient,
      class_level_id: classLevelId,
      teacher_id: teacherId,
    });
    return this.repo.save(course);
  }

  findAll() {
    return this.repo.find({ relations: ['classLevel', 'teacher'] });
  }

  // Trouver les cours d'un prof spécifique
  findByTeacher(teacherId: number) {
    return this.repo.find({
      where: { teacher_id: teacherId },
      relations: ['classLevel'],
    });
  }
}