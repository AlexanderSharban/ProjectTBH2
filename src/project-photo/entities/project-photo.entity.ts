import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { ProjectPhotoComment } from '../../project-photo-comment/entities/project-photo-comment.entity';

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

    @OneToMany('ProjectPhotoLike', 'projectPhoto')
    likes: any[];

    @OneToMany('ProjectPhotoComment', 'projectPhoto')
    comments: any[];

        @ManyToOne(() => Project, project => project.photos)
        @JoinColumn({ name: 'project_id' })
        project: Project;
}