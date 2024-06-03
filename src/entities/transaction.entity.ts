import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn({ name: 'transaction_id' })
  transactionId: number;

  @Column({ nullable: false, type: 'varchar' })
  desc: string;

  @Column({ nullable: false, type: 'varchar' })
  amount: string;

  @ManyToOne(() => User, user => user.transactions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>;
}