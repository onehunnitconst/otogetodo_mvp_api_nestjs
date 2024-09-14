import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { SongDetailDto } from './dto/song-detail.dto';

@Injectable()
export class SongsService {
  constructor(private readonly prisma: PrismaService) {}

  async search(keyword: string) {
    const token = keyword.split(' ');

    const songs = await this.prisma.song.findMany({
      where: {
        title: {
          search: token.join(' & '),
        },
      },
    });

    return songs;
  }

  async getOne(songId: string) {
    const song = await this.prisma.song.findFirst({
      where: {
        id: songId,
      },
      include: {
        charts: true,
      },
    });

    return SongDetailDto.fromModel(song);
  }
}
