// src/energy/overload.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class OverloadEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  voltage: number;

  @Column('float')
  current: number;

  @Column('float')
  power: number;

  @Column()
  status: string;

  @Column()
  timestamp: Date;
}
