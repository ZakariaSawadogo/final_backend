// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
//
// // Import des Modules (Dossiers)
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { ProfileTypesModule } from './profile-types/profile-types.module';
// import { ClassLevelsModule } from './class-levels/class-levels.module';
// import { CoursesModule } from './courses/courses.module';
// import { GradesModule } from './grades/grades.module';
// //import { BulletinsModule } from './bulletins/bulletins.module';
//
// // Import des Entités (Tables)
// import { User } from './users/user.entity';
// import { ProfileType } from './profile-types/profile-types.entity';
// import { ClassLevel } from './class-levels/class-level.entity';
// import { Course } from './courses/course.entity';
// import { Grade } from './grades/grade.entity';
// //import { Bulletin } from './bulletins/bulletin.entity';
// import { StudentResult } from './grades/student-result.entity';
//
// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'mysql',
//       host: 'localhost',
//       port: 3306,
//       username: 'root',
//       password: 'Zackson226@',
//       database: 'dbo_school_management',
//       entities: [User, ProfileType, ClassLevel, Course, Grade,StudentResult],
//       synchronize: true, // Crée les tables automatiquement (super pour le dev)
//     }),
//     AuthModule,
//     UsersModule,
//     ProfileTypesModule,
//     ClassLevelsModule,
//     CoursesModule,
//     GradesModule,
//   ],
// })
// export class AppModule {}
//------------------------------
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
//
// // Modules
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { ProfileTypesModule } from './profile-types/profile-types.module';
// import { ClassLevelsModule } from './class-levels/class-levels.module';
// import { CoursesModule } from './courses/courses.module';
// import { GradesModule } from './grades/grades.module';
//
// // Entités
// import { User } from './users/user.entity';
// import { ProfileType } from './profile-types/profile-types.entity';
// import { ClassLevel } from './class-levels/class-level.entity';
// import { Course } from './courses/course.entity';
// import { Grade } from './grades/grade.entity';
// import { StudentResult } from './grades/student-result.entity';
//
// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'mysql',
//       host: 'localhost',
//       port: 3306,
//       username: 'root',
//       password: 'Zackson226@', // Ton mot de passe DB
//       database: 'dbo_school_management',
//       entities: [User, ProfileType, ClassLevel, Course, Grade, StudentResult],
//       synchronize: true, // À mettre à false en production
//     }),
//     AuthModule,
//     UsersModule,
//     ProfileTypesModule,
//     ClassLevelsModule,
//     CoursesModule,
//     GradesModule,
//   ],
// })
// export class AppModule {}

//---------------------------------------------

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileTypesModule } from './profile-types/profile-types.module';
import { ClassLevelsModule } from './class-levels/class-levels.module';
import { CoursesModule } from './courses/courses.module';
import { GradesModule } from './grades/grades.module';

// Entités
import { User } from './users/user.entity';
import { ProfileType } from './profile-types/profile-types.entity';
import { ClassLevel } from './class-levels/class-level.entity';
import { Course } from './courses/course.entity';
import { Grade } from './grades/grade.entity';
import { StudentResult } from './grades/student-result.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Zackson226@', // Ton mot de passe ici
      database: 'dbo_school_management',
      entities: [User, ProfileType, ClassLevel, Course, Grade, StudentResult],
      synchronize: true, // Auto-sync des tables
    }),
    AuthModule,
    UsersModule,
    ProfileTypesModule,
    ClassLevelsModule,
    CoursesModule,
    GradesModule,
  ],
})
export class AppModule {}