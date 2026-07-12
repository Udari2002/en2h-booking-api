import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number; // Notice the ! added here

  @Column({ unique: true })
  email!: string; // Notice the ! added here

  @Column()
  @Exclude() 
  password!: string; // Notice the ! added here

  @Column({ default: true })
  isActive!: boolean; // Notice the ! added here

  @CreateDateColumn()
  createdAt!: Date; // Notice the ! added here
}