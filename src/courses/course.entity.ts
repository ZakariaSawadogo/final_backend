import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ClassLevel } from '../class-levels/class-level.entity';
import { User } from '../users/user.entity';
import { Grade } from '../grades/grade.entity';

@Entity('tbl_course')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Ex: "Mathématiques"

  @Column({ type: 'int', default: 1 })
  coefficient: number; // Le poids du cours (AKTS/Coeff)

  // À quelle classe ce cours appartient ?
  @ManyToOne(() => ClassLevel, (cl) => cl.courses)
  @JoinColumn({ name: 'class_level_id' })
  classLevel: ClassLevel;

  @Column()
  class_level_id: number;

  // Qui est le prof ?
  @ManyToOne(() => User, (user) => user.coursesGiven)
  @JoinColumn({ name: 'teacher_id' })
  teacher: User;

  @Column({ nullable: true })
  teacher_id: number;

  // Les notes associées à ce cours
  @OneToMany(() => Grade, (grade) => grade.course)
  grades: Grade[];
}