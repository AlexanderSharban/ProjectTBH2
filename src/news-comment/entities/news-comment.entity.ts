import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { News } from '../../news/entities/news.entity';

@Index(['newsId', 'createdAt'])
@Index(['userId'])
@Entity()
export class NewsComment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'news_id' })
    newsId: number;

    @Column({ type: 'text' })
    content: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ManyToOne(() => User, user => user.newsComments)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => News, news => news.comments)
    @JoinColumn({ name: 'news_id' })
    news: News;
}
