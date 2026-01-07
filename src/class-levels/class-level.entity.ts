import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';

@Entity('tbl_class_level')
@Unique(['name'])
export class ClassLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  level: number;


  @OneToMany(() => User, (user) => user.classLevel)
  students: User[];

  @OneToMany(() => Course, (course) => course.classLevel)
  courses: Course[];
}