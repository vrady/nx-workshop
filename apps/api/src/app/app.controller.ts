import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';
import { Game } from '@bg-hoard/util-interface';

@Controller('games')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllGames(): Game[] {
    return this.appService.getAllGames();
  }

  @Get('/:id')
  getGame(@Param('id') id: string): Game {
    return this.appService.getGame(id);
  }
}
