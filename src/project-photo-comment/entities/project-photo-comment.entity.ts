import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Index(['projectPhotoId', 'createdAt'])
@Index(['userId'])
@Entity()
export class ProjectPhotoComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'project_photo_id' })
  projectPhotoId: number;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, user => user.projectPhotoComments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne('ProjectPhoto', 'comments')
  @JoinColumn({ name: 'project_photo_id' })
  projectPhoto: any;
}
