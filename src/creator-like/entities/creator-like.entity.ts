import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Creator } from '../../creator/entities/creator.entity';

@Entity()
export class CreatorLike {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'user_id' })
	userId: number;

	@Column({ name: 'creator_id' })
	creatorId: number;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

		@ManyToOne(() => User, user => user.creatorLikes)
		user: User;

		@ManyToOne(() => Creator, creator => creator.creatorLikes)
		creator: Creator;
}