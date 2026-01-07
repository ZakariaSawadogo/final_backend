import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassLevel } from './class-level.entity';

@Injectable()
export class ClassLevelsService {
  constructor(@InjectRepository(ClassLevel) private repo: Repository<ClassLevel>) {}

  create(data: { name: string; level: number }) {
    const cls = this.repo.create(data);
    return this.repo.save(cls);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const cls = await this.repo.findOne({ where: { id } });
    if (!cls) throw new NotFoundException('Classe non trouvée');
    return cls;
  }

  async update(id: number, attrs: Partial<ClassLevel>) {
    const cls = await this.findOne(id);
    Object.assign(cls, attrs);
    return this.repo.save(cls);
  }

  async remove(id: number) {
    const cls = await this.findOne(id);
    return this.repo.remove(cls);
  }
}