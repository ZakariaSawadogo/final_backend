import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassLevelsService } from './class-levels.service';
import { ClassLevelsController } from './class-levels.controller';
import { ClassLevel } from './class-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassLevel])],
  providers: [ClassLevelsService],
  controllers: [ClassLevelsController],
  exports: [ClassLevelsService],
})
export class ClassLevelsModule {}