import Prisma from '@prisma/client';

export class SongListItemDto {
  id: string;
  title: string;
  cover?: string;
  category?: string;
  artist: string;
  gameCode: string;
  addedDate: Date;
  addedVersion: string;

  static fromModel(model: Prisma.Song): SongListItemDto {
    return {
      id: model.id,
      title: model.title,
      cover: model.cover,
      category: model.category,
      artist: model.artist,
      gameCode: model.game_code,
      addedDate: model.added_date,
      addedVersion: model.added_version,
    };
  }
}
