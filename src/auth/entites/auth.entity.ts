import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Auth')
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: 'user' })
  role!: string;
}