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
