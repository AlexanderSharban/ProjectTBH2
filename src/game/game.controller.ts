import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GameService } from './game.controller.spec';
import { CreateGameDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { Feature } from './entities/feature.entity';
import { Game } from './entities/game.entity';
import { UpdateGameDto } from './dto/update-game.dto';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GameService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new game' })
  @ApiResponse({ status: 201, description: 'Game created successfully', type: Game })
  create(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all games with their monitors' })
  @ApiResponse({ status: 200, description: 'List of all games', type: [Game] })
  findAll(): Promise<Game[]> {
    return this.gamesService.findAll();
  }

  @Get('monitor/:monitorId')
  @ApiOperation({ summary: 'Get games by monitor ID' })
  @ApiParam({ name: 'monitorId', type: 'number', description: 'Monitor ID' })
  @ApiResponse({ status: 200, description: 'List of games for the monitor', type: [Game] })
  findByMonitorId(@Param('monitorId', ParseIntPipe) monitorId: number): Promise<Game[]> {
    return this.gamesService.findByMonitorId(monitorId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get game by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Game ID' })
  @ApiResponse({ status: 200, description: 'Game found', type: Game })
  @ApiResponse({ status: 404, description: 'Game not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Game> {
    return this.gamesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update game' })
  @ApiParam({ name: 'id', type: 'number', description: 'Game ID' })
  @ApiResponse({ status: 200, description: 'Game updated', type: Game })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGameDto: UpdateGameDto,
  ): Promise<Game> {
    return this.gamesService.update(id, updateGameDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete game' })
  @ApiParam({ name: 'id', type: 'number', description: 'Game ID' })
  @ApiResponse({ status: 200, description: 'Game deleted' })
  @ApiResponse({ status: 404, description: 'Game not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.gamesService.remove(id);
  }
}