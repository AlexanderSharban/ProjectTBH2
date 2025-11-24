import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { ProjectPhotoLike } from '../../project-photo-like.entity/entities/project-photo-like.entity';

@Entity()
export class ProjectPhoto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'project_id' })
    projectId: number;

    @Column()
    url: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ name: 'is_primary', default: false })
    isPrimary: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @OneToMany(() => ProjectPhotoLike, like => like.projectPhoto)
    likes: ProjectPhotoLike[];

        @ManyToOne(() => Project, project => project.photos)
        @JoinColumn({ name: 'project_id' })
        project: Project;
}