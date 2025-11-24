import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Index } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Creator } from '../../creator/entities/creator.entity';

@Index(['creatorId', 'createdAt'])
@Index(['userId'])
@Index(['creatorId', 'userId'])
@Entity()
export class CreatorComment {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'user_id' })
	userId: number;

	@Column({ name: 'creator_id' })
	creatorId: number;

	@Column({ type: 'text' })
	content: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

		@ManyToOne(() => User, user => user.creatorComments)
		user: User;

		@ManyToOne(() => Creator, creator => creator.creatorComments)
		creator: Creator;
}