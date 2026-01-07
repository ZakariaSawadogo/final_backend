import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { unlink } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(userData: any, photoUrl: string | null = null) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const newUser = this.repo.create({ ...userData, password: hashedPassword, photo: photoUrl });
    return this.repo.save(newUser);
  }

  async update(id: number, attrs: any, photoUrl?: string) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    if (attrs.password) {
      const salt = await bcrypt.genSalt();
      attrs.password = await bcrypt.hash(attrs.password, salt);
    }
    if (photoUrl) {
      // Optionnel: delete old picture
      if (user.photo) {
        try {
          const filename = user.photo.split('/').pop();
          if (filename) await unlink(join(process.cwd(), 'public', 'uploads', filename));
        } catch (e) { /*ignore if file notfound*/ }
      }
      user.photo = photoUrl;
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    if (user.profileType?.name === 'ADMIN') {
      throw new ForbiddenException("Cant delete admin user for security reasons.");
    }
    if (user.photo) {
      try {
        const filename = user.photo.split('/').pop();
        if (filename) await unlink(join(process.cwd(), 'public', 'uploads', filename));
      } catch (e) { e.response.data.messages }
    }
    return this.repo.remove(user);
  }

  findAll() { return this.repo.find({ relations: ['profileType', 'classLevel'] }); }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['profileType', 'classLevel'] });
  }

  findOneByUsername(username: string) {
    return this.repo.findOne({ where: { username }, relations: ['profileType', 'classLevel'] });
  }
}