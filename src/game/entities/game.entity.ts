import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Creator } from '../../creator/entities/creator.entity';
import { GameComment } from '../../game-comment/entities/game-comment.entity';
import { GameLike } from '../../game-like/entities/game-like.entity';
import { UserGameScores } from '../../user-game-scores/entities/user-game-scores.entity';

@Entity()
export class Game {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 100 })
	title: string;

	@Column({ unique: true, length: 100 })
	slug: string;

	@Column({ type: 'text', nullable: true })
	description: string;

	@Column({ name: 'creator_id' })
	creatorId: number;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

		@ManyToOne(() => Creator, creator => creator.games)
		creator: Creator;

		@OneToMany(() => GameComment, comment => comment.game)
		comments: GameComment[];

		@OneToMany(() => GameLike, like => like.game)
		likes: GameLike[];

		@OneToMany(() => UserGameScores, score => score.game)
		userGameScores: UserGameScores[];
}