import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileTypesService } from './profile-types.service';
import { ProfileTypesController } from './profile-types.controller';
import { ProfileType } from './profile-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileType])],
  providers: [ProfileTypesService],
  controllers: [ProfileTypesController],
  exports: [ProfileTypesService],
})
export class ProfileTypesModule {}