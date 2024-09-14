import Prisma from '@prisma/client';
import { ChartDto } from './chart.dto';

export class SongDetailDto {
  id: string;
  title: string;
  cover?: string;
  category?: string;
  artist: string;
  gameCode: string;
  addedDate: Date;
  addedVersion: string;
  charts: ChartDto[];

  static fromModel(
    model: Prisma.Song & { charts: Prisma.Chart[] },
  ): SongDetailDto {
    return {
      id: model.id,
      title: model.title,
      cover: model.cover,
      category: model.category,
      artist: model.artist,
      gameCode: model.game_code,
      addedDate: model.added_date,
      addedVersion: model.added_version,
      charts: model.charts.map((chart) => ChartDto.fromModel(chart)),
    };
  }
}
