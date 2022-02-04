import {SOLUTIONS} from './wordList';

export class GameUtils {
  static get initialBoardState(): GameState {
    return Array(5)
      .fill(null)
      .map(() =>
        Array(5).fill({
          value: '',
          status: 'blank',
        }),
      );
  }

  static get todaysSolution(): string {
    const startDate = new Date('2/2/2022').getTime();
    const idx = Math.floor((Date.now() - startDate) / 86400000);
    return SOLUTIONS[idx % SOLUTIONS.length];
  }
}

export type TileStatus = 'correct' | 'absent' | 'present' | 'blank' | 'attempt';

export type GameState = {
  value: string;
  status: TileStatus;
}[][];

export const keyList = {
  '0': ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  '1': ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  '2': ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
};
