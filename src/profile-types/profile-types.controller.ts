import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProfileTypesService } from './profile-types.service';

@Controller('profile-types')
export class ProfileTypesController {
  constructor(private readonly service: ProfileTypesService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.service.create(name);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}