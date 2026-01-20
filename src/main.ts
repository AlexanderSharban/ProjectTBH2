import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { UserService } from './user/user.service';
import { NewsService } from './news/news.service';
import { ProjectService } from './project/project.service';
import { ProjectPhotoService } from './project-photo/project-photo.service';
import { CreatorService } from './creator/creator.service';
import { GamesService } from './game/game.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = +(process.env.PORT || 3014);
  await app.listen(port);

  // Seed test data
  const userService = app.get(UserService);
  const creatorService = app.get(CreatorService);
  const newsService = app.get(NewsService);
  const projectService = app.get(ProjectService);
  const projectPhotoService = app.get(ProjectPhotoService);
  const gamesService = app.get(GamesService);

  try {
    // Check if test user already exists
    let user = await userService.findByEmail('test@example.com');
    if (!user) {
      // Create test user
      user = await userService.create({ email: 'test@example.com', username: 'testuser', passwordHash: 'hashedpassword' });
    }

    // Check if creator exists
    let creator = await creatorService.findByUserId(user.id);
    if (!creator) {
      creator = await creatorService.create({ userId: user.id, name: 'Test Creator', bio: 'Test bio' });
    }

    // Create test news if not exists
    const existingNews = await newsService.findAll();
    if (existingNews.length === 0) {
      await newsService.create({ title: 'Test News 1', content: 'This is test news content 1', creatorId: creator.id });
      await newsService.create({ title: 'Test News 2', content: 'This is test news content 2', creatorId: creator.id });
    }

    // Create test project if not exists
    const existingProjects = await projectService.findAll();
    if (existingProjects.length === 0) {
      const project = await projectService.create({ title: 'Test Project', description: 'Test project description', creatorId: creator.id });

      // Create test photo
      await projectPhotoService.create({ projectId: project.id, url: 'https://via.placeholder.com/300', description: 'Test photo', isPrimary: true });
    }

    // Seed games if not exists
    const existingGames = await gamesService.findAll();
    if (existingGames.length === 0) {
      await gamesService.create({ title: 'Minesweeper', slug: 'minesweeper', description: 'Classic Minesweeper game', creatorId: creator.id });
      await gamesService.create({ title: 'Pingpong', slug: 'pingpong', description: 'Pingpong game', creatorId: creator.id });
      await gamesService.create({ title: 'Tetris', slug: 'tetris', description: 'Classic Tetris game', creatorId: creator.id });
      await gamesService.create({ title: 'Tamagotchi', slug: 'tamagotchi', description: 'Tamagotchi shooter game', creatorId: creator.id });
      await gamesService.create({ title: 'Survival', slug: 'survival', description: 'Survival game', creatorId: creator.id });
    }

  } catch (error) {
    console.log('Seeding error:', error.message);
  }
}
bootstrap();
