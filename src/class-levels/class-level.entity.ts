import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';

@Entity('tbl_class_level')
export class ClassLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Ex: "3ème A", "Terminale C"

  @Column({ nullable: true })
  level: number; // Ex: 3 (pour trier)

  // Les élèves de cette classe
  @OneToMany(() => User, (user) => user.classLevel)
  students: User[];

  // Les cours dispensés dans cette classe
  @OneToMany(() => Course, (course) => course.classLevel)
  courses: Course[];
}