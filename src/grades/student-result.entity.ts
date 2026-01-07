import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('tbl_student_result')
export class StudentResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  student_id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'student_id' })
  student: User;

  @Column({ type: 'float', default: 0 })
  general_average: number;
}