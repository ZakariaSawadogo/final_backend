import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('tbl_bulletin')
export class Bulletin {
  @PrimaryGeneratedColumn()
  id: number;

  // À qui appartient ce bulletin ?
  @ManyToOne(() => User, (user) => user.bulletins)
  @JoinColumn({ name: 'student_id' })
  student: User;

  @Column()
  student_id: number;

  @Column({ type: 'float', nullable: true })
  general_average: number; // La moyenne générale pondérée

  @Column({ nullable: true })
  status: string; // 'PASSED', 'REPEATING', 'PENDING'

  @Column({ default: 'T1' })
  term: string;

  @Column()
  academic_year: string; // Ex: "2025-2026"
}