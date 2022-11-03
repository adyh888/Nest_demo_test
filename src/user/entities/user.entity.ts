import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickName: string;

  @Column()
  userName: string;

  @Column()
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column('datetime')
  createtime: string;

  @Column('datetime')
  updatetime: string;
}
