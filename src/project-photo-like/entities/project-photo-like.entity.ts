import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ProjectPhoto } from '../../project-photo/entities/project-photo.entity';

@Index(['projectPhotoId'])
@Index(['userId', 'projectPhotoId'], { unique: true })
@Entity()
export class ProjectPhotoLike {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'user_id' })
	userId: number;

	@Column({ name: 'project_photo_id' })
	projectPhotoId: number;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

		@ManyToOne(() => User, user => user.projectPhotoLikes)
		@JoinColumn({ name: 'user_id' })
		user: User;

		@ManyToOne(() => ProjectPhoto, photo => photo.likes)
		@JoinColumn({ name: 'project_photo_id' })
		projectPhoto: ProjectPhoto;
}
