import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Index, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Game } from '../../game/entities/game.entity';

@Index(['gameId', 'createdAt'])
@Index(['userId'])
@Entity()
export class GameComment {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'user_id' })
	userId: number;

	@Column({ name: 'game_id' })
	gameId: number;

	@Column({ type: 'text' })
	content: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

		@ManyToOne(() => User, user => user.gameComments)
		user: User;

		@ManyToOne(() => Game, game => game.comments)
		game: Game;
}