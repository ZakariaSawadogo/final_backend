import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';

@Entity('tbl_grade')
@Unique(['student_id', 'course_id'])
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  student_id: number;

  @ManyToOne(() => User, (user) => user.grades)
  @JoinColumn({ name: 'student_id' })
  student: User;

  @Column()
  course_id: number;

  @ManyToOne(() => Course, (course) => course.grades)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  // CORRECTION ICI : Ajout de "| null"
  @Column({ type: 'float', nullable: true })
  devoir1: number | null;

  @Column({ type: 'float', nullable: true })
  devoir2: number | null;

  @Column({ type: 'float', nullable: true })
  composition: number | null;

  @Column({ type: 'float', nullable: true })
  average: number | null;
}