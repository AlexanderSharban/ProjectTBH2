import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Project } from '../../project/entities/project.entity';

@Entity()
export class ProjectComment {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'user_id' })
	userId: number;

	@Column({ name: 'project_id' })
	projectId: number;

	@Column({ type: 'text' })
	content: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

		@ManyToOne(() => User, user => user.projectComments)
		@JoinColumn({ name: 'user_id' })
		user: User;

		@ManyToOne(() => Project, project => project.comments)
		@JoinColumn({ name: 'project_id' })
		project: Project;
}