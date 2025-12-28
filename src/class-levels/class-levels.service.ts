import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassLevel } from './class-level.entity';

@Injectable()
export class ClassLevelsService {
  constructor(
    @InjectRepository(ClassLevel)
    private repo: Repository<ClassLevel>,
  ) {}

  create(name: string, level: number) {
    const classLevel = this.repo.create({ name, level });
    return this.repo.save(classLevel);
  }

  findAll() {
    return this.repo.find({ relations: ['students', 'courses'] });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['students', 'courses'],
    });
  }
}