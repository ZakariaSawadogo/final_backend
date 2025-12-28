import { IsString, IsNotEmpty, IsNumber, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6, { message: 'Le mot de passe doit faire au moins 6 caractères' })
  password: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsNumber()
  @IsNotEmpty()
  profile_type_id: number; // 1=Admin, 2=Prof, 3=Student (selon ta BDD)

  @IsNumber()
  @IsOptional()
  class_level_id?: number; // Obligatoire seulement pour les élèves
}