import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(Course) private repo: Repository<Course>) {}

  create(course: Partial<Course>) {
    return this.repo.save(this.repo.create(course));
  }

  findAll() {
    return this.repo.find({ relations: ['classLevel', 'teacher'] });
  }

  async findOne(id: number) {
    const course = await this.repo.findOne({ where: { id }, relations: ['classLevel', 'teacher'] });
    if (!course) throw new NotFoundException('Cours introuvable');
    return course;
  }

  findByTeacher(teacherId: number) {
    return this.repo.find({ where: { teacher_id: teacherId }, relations: ['classLevel'] });
  }

  findByClass(classId: number) {
    return this.repo.find({ where: { class_level_id: classId }, relations: ['teacher'] });
  }

  async update(id: number, attrs: Partial<Course>) {
    await this.repo.update(id, attrs);
    return this.findOne(id);
  }

  async remove(id: number) {
    const course = await this.findOne(id);
    return this.repo.remove(course);
  }
}