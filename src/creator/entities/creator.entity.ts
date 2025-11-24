import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { CreatorComment } from '../../creator-comment/entities/creator-comment.entity';
import { CreatorLike } from '../../creator-like/entities/creator-like.entity';
import { Game } from '../../game/entities/game.entity';
import { Project } from '../../project/entities/project.entity';
import { News } from '../../news/entities/news.entity';

@Entity()
export class Creator {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'user_id', unique: true })
	userId: number;

	@Column({ length: 100 })
	name: string;

	@Column({ type: 'text', nullable: true })
	bio: string;

	@Column({ name: 'avatar_url', nullable: true })
	avatarUrl: string;

	@Column({ name: 'likes_count', default: 0 })
	likesCount: number;

	@Column({ name: 'comments_count', default: 0 })
	commentsCount: number;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

		@OneToOne(() => User, user => user.creator)
		@JoinColumn({ name: 'user_id' })
		user: User;

		@OneToMany(() => CreatorComment, comment => comment.creator)
		creatorComments: CreatorComment[];

		@OneToMany(() => CreatorLike, like => like.creator)
		creatorLikes: CreatorLike[];

		@OneToMany(() => Game, game => game.creator)
		games: Game[];

		@OneToMany(() => Project, project => project.creator)
		projects: Project[];

		@OneToMany(() => News, news => news.creator)
		news: News[];
}