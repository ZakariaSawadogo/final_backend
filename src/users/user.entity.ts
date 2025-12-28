import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ProfileType } from '../profile-types/profile-types.entity';
import { ClassLevel } from '../class-levels/class-level.entity';
import { Course } from '../courses/course.entity';
import { Grade } from '../grades/grade.entity';
import { Bulletin } from '../bulletins/bulletin.entity';

@Entity('tbl_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  // --- RELATIONS ---

  // 1. Rôle (Obligatoire)
  @ManyToOne(() => ProfileType, (pt) => pt.users)
  @JoinColumn({ name: 'profile_type_id' })
  profileType: ProfileType;

  @Column()
  profile_type_id: number;

  // 2. Classe (Seulement pour les élèves, donc nullable)
  @ManyToOne(() => ClassLevel, (cl) => cl.students, { nullable: true })
  @JoinColumn({ name: 'class_level_id' })
  classLevel: ClassLevel;

  @Column({ nullable: true })
  class_level_id: number;

  // 3. Cours donnés (Seulement pour les profs)
  @OneToMany(() => Course, (course) => course.teacher)
  coursesGiven: Course[];

  // 4. Notes reçues (Seulement pour les élèves)
  @OneToMany(() => Grade, (grade) => grade.student)
  grades: Grade[];

  // 5. Bulletin général (Seulement pour les élèves)
  @OneToMany(() => Bulletin, (bulletin) => bulletin.student)
  bulletins: Bulletin[];
}