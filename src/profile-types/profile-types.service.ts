import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileType } from './profile-types.entity';

@Injectable()
export class ProfileTypesService {
  constructor(
    @InjectRepository(ProfileType)
    private repo: Repository<ProfileType>,
  ) {}

  async create(name: string) {
    const existing = await this.repo.findOneBy({ name });
    if (existing) return existing;
    const profileType = this.repo.create({ name });
    return this.repo.save(profileType);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
}