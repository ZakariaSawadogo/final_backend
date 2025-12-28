import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Permet d'injecter Repository<User>
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Important si AuthModule a besoin de UsersService
})
export class UsersModule {}