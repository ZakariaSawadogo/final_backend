import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';

@Entity('tbl_grade')
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  // Relation: Note obtenue par quel élève ?
  @ManyToOne(() => User, (user) => user.grades)
  @JoinColumn({ name: 'student_id' })
  student: User;

  @Column()
  student_id: number;

  // Relation: Note dans quelle matière ?
  @ManyToOne(() => Course, (course) => course.grades)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column()
  course_id: number;

  // Les notes sur 20
  @Column({ type: 'float', nullable: true })
  devoir1: number; // 25%

  @Column({ type: 'float', nullable: true })
  devoir2: number; // 25%

  @Column({ type: 'float', nullable: true })
  composition: number; // 50%

  @Column({ default: 'T1' })
  term: string;

  // Moyenne de la matière (calculée par le service avant sauvegarde)
  @Column({ type: 'float', nullable: true })
  average: number;
}