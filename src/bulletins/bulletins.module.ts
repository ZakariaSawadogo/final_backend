import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BulletinsService } from './bulletins.service';
import { BulletinsController } from './bulletins.controller';
import { Bulletin } from './bulletin.entity';
import { Grade } from '../grades/grade.entity'; // <--- 1. Importe l'entité Grade

@Module({
  imports: [
    TypeOrmModule.forFeature([Bulletin, Grade]) // <--- 2. Ajoute Grade ici
  ],
  providers: [BulletinsService],
  controllers: [BulletinsController],
  exports: [BulletinsService],
})
export class BulletinsModule {}