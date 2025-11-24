import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Index(['newsId'])
@Index(['userId', 'newsId'], { unique: true })
@Entity()
export class NewsLike {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'user_id' })
	userId: number;

	@Column({ name: 'news_id' })
	newsId: number;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@ManyToOne(() => User, user => user.newsLikes)
	@JoinColumn({ name: 'user_id' })
	user: User;
}