import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ nullable: false, type: 'varchar', unique: true })
  username: string;

  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @Column({ nullable: false, type: 'varchar' })
  firstname: string;

  @Column({ nullable: false, type: 'varchar' })
  lastname: string;

  @Column({ nullable: false, default: 0, type: 'int' })
  money: number;

  @OneToMany(() => Transaction, transaction => transaction.user, { cascade: true })
  transactions: Transaction[];
}