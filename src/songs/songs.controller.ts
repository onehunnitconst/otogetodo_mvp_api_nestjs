import { Controller, Get, Param, Query } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  async searchSongs(@Query('keyword') keyword = '') {
    return this.songsService.search(keyword);
  }

  @Get(':songId')
  async getSong(@Param('songId') songId: string) {
    return this.songsService.getOne(songId);
  }
}
