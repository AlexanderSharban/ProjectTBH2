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
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST || 'localhost',
          port: +(process.env.DB_PORT || 1111),
          username: process.env.DB_USER || 'web2user',
          password: process.env.DB_PASSWORD || 'web2password',
          database: process.env.DB_NAME || 'web2db',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true, 
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
