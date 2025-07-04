// src/auth/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true})
  username: string;
  
  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Se almacenará hasheada
}
