import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserGameScoresService } from './user-game-scores.service';
import { CreateUserGameScoresDto } from './dto/create-user-game-scores.dto';
import { UpdateUserGameScoresDto } from './dto/update-user-game-scores.dto';
import { UserGameScores } from './entities/user-game-scores.entity';

@ApiTags('user-game-scores')
@Controller('user-game-scores')
export class UserGameScoresController {
  constructor(private readonly service: UserGameScoresService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user game score' })
  @ApiResponse({ status: 201, description: 'Created successfully', type: UserGameScores })
  create(@Body() dto: CreateUserGameScoresDto): Promise<UserGameScores> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user game scores' })
  @ApiResponse({ status: 200, description: 'List', type: [UserGameScores] })
  findAll(): Promise<UserGameScores[]> {
    return this.service.findAll();
  }

  @Get('game/:gameId')
  @ApiOperation({ summary: 'Get scores by game ID' })
  @ApiParam({ name: 'gameId', type: 'number' })
  findByGameId(@Param('gameId', ParseIntPipe) gameId: number): Promise<UserGameScores[]> {
    return this.service.findByGameId(gameId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserGameScores> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserGameScoresDto): Promise<UserGameScores> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}