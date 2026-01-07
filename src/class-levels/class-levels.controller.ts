import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ClassLevelsService } from './class-levels.service';

@Controller('class-levels')
export class ClassLevelsController {
  constructor(private readonly service: ClassLevelsService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Post()
  create(@Body() body: { name: string; level: number }) { return this.service.create(body); }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}