import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ClassLevelsService } from './class-levels.service';

@Controller('class-levels')
export class ClassLevelsController {
  constructor(private readonly classLevelsService: ClassLevelsService) {}

  @Post()
  create(@Body() body: { name: string; level: number }) {
    return this.classLevelsService.create(body.name, body.level);
  }

  @Get()
  findAll() {
    return this.classLevelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.classLevelsService.findOne(id);
  }
}