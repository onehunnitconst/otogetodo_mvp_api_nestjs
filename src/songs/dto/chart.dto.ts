import Prisma from '@prisma/client';

export class ChartDto {
  id: string;
  mode?: string;
  difficulty: string;
  level: string;
  detailed_level?: string;

  static fromModel(model: Prisma.Chart): ChartDto {
    return {
      id: model.id,
      mode: model.mode,
      difficulty: model.difficulty,
      level: model.level,
      detailed_level: model.detailed_level,
    };
  }
}
