import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GamesService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new game' })
  @ApiResponse({ status: 201, description: 'Game created successfully', type: Game })
  create(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all games' })
  @ApiResponse({ status: 200, description: 'List of all games', type: [Game] })
  findAll(): Promise<Game[]> {
    return this.gamesService.findAll();
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