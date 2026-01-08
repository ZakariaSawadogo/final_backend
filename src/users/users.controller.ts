import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsersService } from './users.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorateurs';


const storageConfig = diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(
      file.originalname,
    )}`;
    cb(null, uniqueName);
  },
});

@Controller('users')

@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get()
  @Roles('ADMIN', 'PROF', 'STUDENT')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'PROF', 'STUDENT')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }


  @Post()
  @Roles('ADMIN')
  @UseInterceptors(FileInterceptor('photo', { storage: storageConfig }))
  create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    const dto = { ...body };

    if (dto.profile_type_id) dto.profile_type_id = parseInt(dto.profile_type_id);
    if (dto.class_level_id) dto.class_level_id = parseInt(dto.class_level_id);


    const baseUrl = process.env.RAILWAY_PUBLIC_DOMAIN
      ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
      : 'http://localhost:3000';

    const photoUrl = file ? `${baseUrl}/uploads/${file.filename}` : null;

    return this.usersService.create(dto, photoUrl);
  }

  @Patch(':id')
  @Roles('ADMIN', 'PROF', 'STUDENT')
  @UseInterceptors(FileInterceptor('photo', { storage: storageConfig }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const dto = { ...body };
    if (dto.profile_type_id) dto.profile_type_id = parseInt(dto.profile_type_id);
    if (dto.class_level_id) dto.class_level_id = parseInt(dto.class_level_id);


    const baseUrl = process.env.RAILWAY_PUBLIC_DOMAIN
      ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
      : 'http://localhost:3000';

    const photoUrl = file ? `${baseUrl}/uploads/${file.filename}` : undefined;

    return this.usersService.update(id, dto, photoUrl);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}