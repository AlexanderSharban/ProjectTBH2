import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Creator } from '../../creator/entities/creator.entity';

@Entity()
export class News {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 255 })
	title: string;

	@Column({ type: 'text' })
	content: string;

	@Column({ type: 'text', nullable: true })
	excerpt: string;

	@Column({ unique: true, nullable: true, length: 255 })
	slug: string;

	@Column({ name: 'creator_id' })
	creatorId: number;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@ManyToOne(() => Creator, creator => creator.news)
	@JoinColumn({ name: 'creator_id' })
	creator: Creator;
}