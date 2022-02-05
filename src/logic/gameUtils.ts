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

  static get initialStats(): Statistics {
    return {
      gamesPlayed: 0,
      streak: 0,
      maxStreak: 0,
      guesses: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
    };
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

  static winIndex(gameState: GameState) {
    return gameState.findIndex((row) =>
      row.every((x) => x.status === 'correct' || x.status === 'done'),
    );
  }

  static hasWon(gameState: GameState) {
    return this.winIndex(gameState) !== -1;
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

  static getWinPercentage(statistics: Statistics) {
    if (statistics.gamesPlayed === 0) return 0;
    return Math.round(
      (Object.values(statistics.guesses).reduce((a, b) => a + b, 0) * 100) / statistics.gamesPlayed,
    );
  }

  static getHighestGuess(statistics: Statistics) {
    return Math.max(...Object.values(statistics.guesses));
  }

  static updateStats(statistics: Statistics, gameState: GameState) {
    const winIndex = this.winIndex(gameState);
    if (winIndex === -1) return statistics;

    const newStreak = statistics.streak + 1;
    return {
      gamesPlayed: statistics.gamesPlayed + 1,
      streak: newStreak,
      maxStreak: newStreak > statistics.maxStreak ? newStreak : statistics.maxStreak,
      guesses: {
        ...statistics.guesses,
        [winIndex + 1]: statistics.guesses[(winIndex + 1) as keyof Statistics['guesses']] + 1,
      },
    };
  }
}

export type TileStatus = 'correct' | 'absent' | 'present' | 'blank' | 'attempt' | 'done';

export type GameState = {
  value: string;
  status: TileStatus;
}[][];

export type Statistics = {
  gamesPlayed: number;
  streak: number;
  maxStreak: number;
  guesses: {1: number; 2: number; 3: number; 4: number; 5: number; 6: number};
};
