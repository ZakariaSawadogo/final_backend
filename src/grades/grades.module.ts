import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { Grade } from './grade.entity';
import { StudentResult } from './student-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grade, StudentResult])],
  providers: [GradesService],
  controllers: [GradesController],
})
export class GradesModule {}