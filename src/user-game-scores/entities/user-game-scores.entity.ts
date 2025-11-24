import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Game } from '../../game/entities/game.entity';

@Entity()
@Index(['userId', 'gameId'], { unique: true })
export class UserGameScores {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'user_id' })
	userId: number;

	@Column({ name: 'game_id' })
	gameId: number;

	@Column({ name: 'max_score' })
	maxScore: number;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@ManyToOne(() => User, user => user.userGameScores)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => Game, game => game.userGameScores)
	@JoinColumn({ name: 'game_id' })
	game: Game;
}