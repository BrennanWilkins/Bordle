import {SOLUTIONS, VALID_GUESSES} from './wordList';

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

  static getCurrentRowIdx(gameState: GameState) {
    return gameState.findIndex((row) =>
      row.some((x) => x.status === 'blank' || x.status === 'attempt'),
    );
  }

  static guessIsValid(currentRow: GameState[0]) {
    const word = currentRow.map((x) => x.value).join('');
    return VALID_GUESSES.includes(word) || SOLUTIONS.includes(word);
  }

  static updateRowStatus(row: GameState[0]): GameState[0] {
    const answer = this.todaysSolution;
    const word = row.map((x) => x.value).join('');
    return row.map((guess, idx) => ({
      status:
        word === answer
          ? 'done'
          : guess.value === answer[idx]
          ? 'correct'
          : answer.includes(guess.value)
          ? 'present'
          : 'absent',
      value: guess.value,
    }));
  }

  static hasWon(gameState: GameState) {
    return !!gameState.find((row) =>
      row.every((x) => x.status === 'correct' || x.status === 'done'),
    );
  }

  static getKeyStatus(key: string, gameState: GameState) {
    const flatState = gameState.flat();
    return flatState.find((x) => x.value === key && x.status === 'correct')
      ? 'correct'
      : flatState.find((x) => x.value === key && x.status === 'present')
      ? 'present'
      : flatState.find((x) => x.value === key && x.status === 'absent')
      ? 'absent'
      : 'blank';
  }

  static keyList = {
    '0': ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    '1': ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    '2': ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  };

  static allKeysList = [...this.keyList['0'], ...this.keyList['1'], ...this.keyList['2']];
}

export type TileStatus = 'correct' | 'absent' | 'present' | 'blank' | 'attempt' | 'done';

export type GameState = {
  value: string;
  status: TileStatus;
}[][];
