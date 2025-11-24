import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Project } from '../../project/entities/project.entity';

@Index(['projectId'])
@Index(['userId', 'projectId'], { unique: true })
@Entity()
export class ProjectLike {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'user_id' })
	userId: number;

	@Column({ name: 'project_id' })
	projectId: number;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

		@ManyToOne(() => User, user => user.projectLikes)
		@JoinColumn({ name: 'user_id' })
		user: User;

		@ManyToOne(() => Project, project => project.likes)
		@JoinColumn({ name: 'project_id' })
		project: Project;
}