import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsersService } from './users.service';

const storageConfig = diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() { return this.usersService.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.usersService.findOne(id); }

  @Post()
  @UseInterceptors(FileInterceptor('photo', { storage: storageConfig }))
  create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    const dto = { ...body };
    if (dto.profile_type_id) dto.profile_type_id = parseInt(dto.profile_type_id);
    if (dto.class_level_id) dto.class_level_id = parseInt(dto.class_level_id);
    const photoUrl = file ? `http://localhost:3000/uploads/${file.filename}` : null;
    return this.usersService.create(dto, photoUrl);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo', { storage: storageConfig }))
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any, @UploadedFile() file: Express.Multer.File) {
    const dto = { ...body };
    if (dto.profile_type_id) dto.profile_type_id = parseInt(dto.profile_type_id);
    if (dto.class_level_id) dto.class_level_id = parseInt(dto.class_level_id);
    const photoUrl = file ? `http://localhost:3000/uploads/${file.filename}` : undefined;
    return this.usersService.update(id, dto, photoUrl);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.usersService.remove(id); }
}