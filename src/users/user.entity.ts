import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ProfileType } from '../profile-types/profile-types.entity';
import { ClassLevel } from '../class-levels/class-level.entity';
import { Course } from '../courses/course.entity';
import { Grade } from '../grades/grade.entity';

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

  @Column({ nullable: true })
  photo: string;

  // --- RELATIONS ---

  @Column()
  profile_type_id: number;

  @ManyToOne(() => ProfileType, (pt) => pt.users)
  @JoinColumn({ name: 'profile_type_id' })
  profileType: ProfileType;

  @Column({ nullable: true })
  class_level_id: number;

  @ManyToOne(() => ClassLevel, (cl) => cl.students, { nullable: true })
  @JoinColumn({ name: 'class_level_id' })
  classLevel: ClassLevel;


  @OneToMany(() => Course, (course) => course.teacher)
  coursesGiven: Course[];


  @OneToMany(() => Grade, (grade) => grade.student)
  grades: Grade[];
}