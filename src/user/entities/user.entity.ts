import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, OneToMany } from 'typeorm';
import { Creator } from '../../creator/entities/creator.entity';
import { CreatorComment } from '../../creator-comment/entities/creator-comment.entity';
import { CreatorLike } from '../../creator-like/entities/creator-like.entity';
import { GameComment } from '../../game-comment/entities/game-comment.entity';
import { GameLike } from '../../game-like/entities/game-like.entity';
import { ProjectComment } from '../../project-comment/entities/project-comment.entity';
import { ProjectLike } from '../../project-like/entities/project-like.entity';
import { ProjectPhotoLike } from '../../project-photo-like.entity/entities/project-photo-like.entity';
import { NewsComment } from '../../news-comment/entities/news-comment.entity';
import { NewsLike } from '../../news-like/entities/news-like.entity';
import { UserGameScores } from '../../user-game-scores/entities/user-game-scores.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	email: string;

	@Column({ unique: true })
	username: string;

	@Column({ name: 'password_hash' })
	passwordHash: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

		@OneToOne(() => Creator, creator => creator.user)
		creator: Creator;

		@OneToMany(() => CreatorComment, comment => comment.user)
		creatorComments: CreatorComment[];

		@OneToMany(() => CreatorLike, like => like.user)
		creatorLikes: CreatorLike[];

		@OneToMany(() => GameComment, comment => comment.user)
		gameComments: GameComment[];

		@OneToMany(() => GameLike, like => like.user)
		gameLikes: GameLike[];

		@OneToMany(() => ProjectComment, comment => comment.user)
		projectComments: ProjectComment[];

		@OneToMany(() => ProjectLike, like => like.user)
		projectLikes: ProjectLike[];

		@OneToMany(() => ProjectPhotoLike, like => like.user)
		projectPhotoLikes: ProjectPhotoLike[];

		@OneToMany(() => NewsComment, comment => comment.user)
		newsComments: NewsComment[];

		@OneToMany(() => NewsLike, like => like.user)
		newsLikes: NewsLike[];

		@OneToMany(() => UserGameScores, score => score.user)
		userGameScores: UserGameScores[];
}