import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt'; // <--- AJOUT IMPORTANT

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async create(userData: any) {
    // 1. On crypte le mot de passe avant de sauvegarder
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // 2. On remplace le mot de passe en clair par le hash
    const newUser = this.repo.create({
      ...userData,
      password: hashedPassword,
    });

    return this.repo.save(newUser);
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.repo.findOne({
      where: { username },
      relations: ['profileType', 'classLevel'],
    });
  }

  findAll() {
    return this.repo.find({ relations: ['profileType', 'classLevel'] });
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({
      where: { id },
      relations: ['profileType', 'classLevel', 'grades', 'grades.course'],
    });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }
}