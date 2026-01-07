// import {
//   Controller,
//   Get,
//   Post,
//   Patch,
//   Delete,
//   Body,
//   Param,
//   ParseIntPipe,
//   UseInterceptors,
//   UploadedFile,
//   UseGuards,
// } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { extname } from 'path';
// import { UsersService } from './users.service';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';
//
// const storageConfig = diskStorage({
//   destination: './public/uploads',
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${extname(file.originalname)}`;
//     cb(null, uniqueName);
//   },
// });
//
// @Controller('users')
// @UseGuards(JwtAuthGuard, RolesGuard)
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}
//
//   @Get()
//   findAll() { return this.usersService.findAll(); }
//
//   @Get(':id')
//   findOne(@Param('id', ParseIntPipe) id: number) { return this.usersService.findOne(id); }
//
//   @Post()
//   @UseInterceptors(FileInterceptor('photo', { storage: storageConfig }))
//   create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
//     const dto = { ...body };
//     if (dto.profile_type_id) dto.profile_type_id = parseInt(dto.profile_type_id);
//     if (dto.class_level_id) dto.class_level_id = parseInt(dto.class_level_id);
//     const photoUrl = file ? `http://localhost:3000/uploads/${file.filename}` : null;
//     return this.usersService.create(dto, photoUrl);
//   }
//
//   @Patch(':id')
//   @UseInterceptors(FileInterceptor('photo', { storage: storageConfig }))
//   update(@Param('id', ParseIntPipe) id: number, @Body() body: any, @UploadedFile() file: Express.Multer.File) {
//     const dto = { ...body };
//     if (dto.profile_type_id) dto.profile_type_id = parseInt(dto.profile_type_id);
//     if (dto.class_level_id) dto.class_level_id = parseInt(dto.class_level_id);
//     const photoUrl = file ? `http://localhost:3000/uploads/${file.filename}` : undefined;
//     return this.usersService.update(id, dto, photoUrl);
//   }
//
//   @Delete(':id')
//   remove(@Param('id', ParseIntPipe) id: number) { return this.usersService.remove(id); }
// }
//
//---------------------------------
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
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsersService } from './users.service';
// Import des Gardiens et du Décorateur
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorateurs';

// Configuration Multer (Inchangée, elle est bien)
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
// 1. On active la sécurité globale (Token + Rôles)
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // --- LECTURE ---
  @Get()
  @Roles('ADMIN', 'PROF', 'STUDENT') // Tout le monde peut voir la liste (pour les classes)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'PROF', 'STUDENT')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // --- ÉCRITURE (RÉSERVÉ ADMIN) ---

  @Post()
  @Roles('ADMIN') // SEUL l'Admin peut créer un utilisateur
  @UseInterceptors(FileInterceptor('photo', { storage: storageConfig }))
  create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    const dto = { ...body };
    // Conversion des ID (car 'multipart/form-data' envoie tout en string)
    if (dto.profile_type_id) dto.profile_type_id = parseInt(dto.profile_type_id);
    if (dto.class_level_id) dto.class_level_id = parseInt(dto.class_level_id);

    // ⚠️ CORRECTION CRITIQUE ICI : Gestion URL dynamique
    // Sur Railway, on veut le vrai domaine. En local, on veut localhost.
    const baseUrl = process.env.RAILWAY_PUBLIC_DOMAIN
      ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
      : 'http://localhost:3000';

    const photoUrl = file ? `${baseUrl}/uploads/${file.filename}` : null;

    return this.usersService.create(dto, photoUrl);
  }

  @Patch(':id')
  @Roles('ADMIN') // SEUL l'Admin peut modifier
  @UseInterceptors(FileInterceptor('photo', { storage: storageConfig }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const dto = { ...body };
    if (dto.profile_type_id) dto.profile_type_id = parseInt(dto.profile_type_id);
    if (dto.class_level_id) dto.class_level_id = parseInt(dto.class_level_id);

    // Même correction ici
    const baseUrl = process.env.RAILWAY_PUBLIC_DOMAIN
      ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
      : 'http://localhost:3000';

    const photoUrl = file ? `${baseUrl}/uploads/${file.filename}` : undefined;

    return this.usersService.update(id, dto, photoUrl);
  }

  @Delete(':id')
  @Roles('ADMIN') // SEUL l'Admin peut supprimer
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}