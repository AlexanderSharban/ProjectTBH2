import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GamesModule } from './game/game.module';
import { GameCommentModule } from './game-comment/game-comment.module';
import { GameLikeModule } from './game-like/game-like.module';
import { NewsModule } from './news/news.module';
import { NewsCommentModule } from './news-comment/news-comment.module';
import { NewsLikeModule } from './news-like/news-like.module';
import { ProjectModule } from './project/project.module';
import { ProjectCommentModule } from './project-comment/project-comment.module';
import { ProjectLikeModule } from './project-like/project-like.module';
import { ProjectPhotoModule } from './project-photo/project-photo.module';
import { CreatorModule } from './creator/creator.module';
import { CreatorCommentModule } from './creator-comment/creator-comment.module';
import { CreatorLikeModule } from './creator-like/creator-like.module';
import { UserModule } from './user/user.module';
import { UserGameScoresModule } from './user-game-scores/user-game-scores.module';

@Module({
  imports: [
        // TypeORM root module provides DataSource to repository providers
        // Configure Postgres via environment variables. Defaults are set to
        // the docker-compose values used in this repo (DB_HOST=postgres, DB_PORT=5432).
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST || 'localhost',
          port: +(process.env.DB_PORT || 5433),
          username: process.env.DB_USER || 'postgres',
          password: process.env.DB_PASSWORD || '1111',
          database: process.env.DB_NAME || 'epdb',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true, // dev only — use migrations in production
          logging: false,
        }),
    GamesModule,
    GameCommentModule,
    GameLikeModule,
    NewsModule,
    NewsCommentModule,
    NewsLikeModule,
    ProjectModule,
    ProjectCommentModule,
    ProjectLikeModule,
    ProjectPhotoModule,
    CreatorModule,
    CreatorCommentModule,
    CreatorLikeModule,
    UserModule,
    UserGameScoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
