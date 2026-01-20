import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GameCommentService } from './game-comment.service';
import { CreateGameCommentDto } from './dto/create-game-comment.dto';
import { UpdateGameCommentDto } from './dto/update-game-comment.dto';
import { GameComment } from './entities/game-comment.entity';

@ApiTags('game-comments')
@Controller('game-comments')
export class GameCommentController {
  constructor(private readonly gameCommentService: GameCommentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new game comment' })
  @ApiResponse({ status: 201, description: 'Game comment created successfully', type: GameComment })
  create(@Body() createGameCommentDto: CreateGameCommentDto): Promise<GameComment> {
    return this.gameCommentService.create(createGameCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all game comments' })
  @ApiResponse({ status: 200, description: 'List of all game comments', type: [GameComment] })
  findAll(): Promise<GameComment[]> {
    return this.gameCommentService.findAll();
  }

  @Get('game/:gameId')
  @ApiOperation({ summary: 'Get comments by game ID' })
  @ApiParam({ name: 'gameId', type: 'number' })
  findByGameId(@Param('gameId', ParseIntPipe) gameId: number): Promise<GameComment[]> {
    return this.gameCommentService.findByGameId(gameId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update game comment' })
  @ApiParam({ name: 'id', type: 'number', description: 'Game comment ID' })
  @ApiResponse({ status: 200, description: 'Game comment updated', type: GameComment })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGameCommentDto: UpdateGameCommentDto,
  ): Promise<GameComment> {
    return this.gameCommentService.update(id, updateGameCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete game comment' })
  @ApiParam({ name: 'id', type: 'number', description: 'Game comment ID' })
  @ApiResponse({ status: 200, description: 'Game comment deleted' })
  @ApiResponse({ status: 404, description: 'Game comment not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.gameCommentService.remove(id);
  }
}