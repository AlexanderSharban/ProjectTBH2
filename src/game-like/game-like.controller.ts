import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { FeaturesService } from './game-like.service';
import { CreateGameLikeDto } from './dto/create-game-like.dto';
import { UpdateGameLikeDto } from './dto/update-game-like.dto';
import { GameLike } from './entities/game-like.entity';

@ApiTags('game-likes')
@Controller('game-likes')
export class GameLikeController {
  constructor(private readonly gameLikeService: GameLikeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new game like' })
  @ApiResponse({ status: 201, description: 'Game like created successfully', type: GameLike })
  create(@Body() createGameLikeDto: CreateGameLikeDto): Promise<GameLike> {
    return this.gameLikeService.create(createGameLikeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all game likes' })
  @ApiResponse({ status: 200, description: 'List of all game likes', type: [GameLike] })
  findAll(): Promise<GameLike[]> {
    return this.gameLikeService.findAll();
  }

  @Get('monitor/:monitorId')
  @ApiOperation({ summary: 'Get game likes by monitor ID' })
  @ApiParam({ name: 'monitorId', type: 'number', description: 'Monitor ID' })
  @ApiResponse({ status: 200, description: 'List of game likes for the monitor', type: [GameLike] })
  findByMonitorId(@Param('monitorId', ParseIntPipe) monitorId: number): Promise<GameLike[]> {
    return this.gameLikeService.findByMonitorId(monitorId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get game like by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Game like ID' })
  @ApiResponse({ status: 200, description: 'Game like found', type: GameLike })
  @ApiResponse({ status: 404, description: 'Game like not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<GameLike> {
    return this.gameLikeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update feature' })
  @ApiParam({ name: 'id', type: 'number', description: 'Feature ID' })
  @ApiResponse({ status: 200, description: 'Feature updated', type: Feature })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGameLikeDto: UpdateGameLikeDto,
  ): Promise<GameLike> {
    return this.gameLikeService.update(id, updateGameLikeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete feature' })
  @ApiParam({ name: 'id', type: 'number', description: 'Feature ID' })
  @ApiResponse({ status: 200, description: 'Feature deleted' })
  @ApiResponse({ status: 404, description: 'Game like not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.gameLikeService.remove(id);
  }
}