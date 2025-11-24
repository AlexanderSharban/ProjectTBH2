import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Creator } from '../../creator/entities/creator.entity';
import { ProjectComment } from '../../project-comment/entities/project-comment.entity';
import { ProjectLike } from '../../project-like/entities/project-like.entity';
import { ProjectPhoto } from '../../project-photo/entities/project-photo.entity';

@Entity()
export class Project {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 255 })
	title: string;

	@Column({ type: 'text', nullable: true })
	description: string;

	@Column({ name: 'project_url', nullable: true })
	projectUrl: string;

	@Column({ name: 'source_code_url', nullable: true })
	sourceCodeUrl: string;

	@Column({ default: false })
	featured: boolean;

	@Column({ name: 'creator_id' })
	creatorId: number;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

		@ManyToOne(() => Creator, creator => creator.projects)
		creator: Creator;

		@OneToMany(() => ProjectComment, comment => comment.project)
		comments: ProjectComment[];

		@OneToMany(() => ProjectLike, like => like.project)
		likes: ProjectLike[];

		@OneToMany(() => ProjectPhoto, photo => photo.project)
		photos: ProjectPhoto[];
}