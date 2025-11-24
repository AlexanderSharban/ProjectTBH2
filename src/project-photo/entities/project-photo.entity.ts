import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProjectPhoto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    projectId: number;

    @Column()
    url: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}