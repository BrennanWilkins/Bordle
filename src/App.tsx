import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Header} from './components/Header';
import {Keyboard} from './components/Keyboard';
import {Board} from './components/Board';
import {GameState, GameUtils, Statistics} from './utils/gameUtils';
import {Toaster, toasty} from './components/Toaster';
import {isMobileBrowser} from './utils/isMobileBrowser';

export const App = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const lastPlayedLS = localStorage.getItem('lastPlayed');
    const gameStateLS = localStorage.getItem('gameState');
    if (!gameStateLS || !lastPlayedLS) {
      return GameUtils.getInitialBoardState(!!localStorage.getItem('hardModeEnabled'));
    }
    const today = new Date();
    const lastPlayed = new Date(parseInt(lastPlayedLS));
    if (
      today.getDate() === lastPlayed.getDate() &&
      today.getMonth() === lastPlayed.getMonth() &&
      today.getFullYear() === lastPlayed.getFullYear()
    ) {
      return JSON.parse(gameStateLS);
    }
    return GameUtils.getInitialBoardState(!!localStorage.getItem('hardModeEnabled'));
  });
  const [invalidTryCount, setInvalidTryCount] = useState(0);
  const pressEnabled = useRef(true);
  const [statistics, setStatistics] = useState<Statistics>(() => {
    const statisticsLS = localStorage.getItem('statistics');
    if (statisticsLS) {
      return JSON.parse(statisticsLS);
    }
    return GameUtils.initialStats;
  });
  const {isGameOver, isGameActive} = useMemo(() => {
    return {
      isGameOver: GameUtils.hasFinished(gameState),
      isGameActive: GameUtils.gameIsActive(gameState),
    };
  }, [gameState]);
  const [hardMode, setHardMode] = useState(() => {
    return !!localStorage.getItem('hardModeEnabled');
  });

  const onKeyPress = useCallback(
    (key: string) => {
      if (!pressEnabled.current || isGameOver) return;
      const newState = gameState.map((x) => [...x]);
      const currentRowIdx = GameUtils.getCurrentRowIdx(newState);
      let row = newState[currentRowIdx];
      const lastEnteredIdx = row.findIndex((x) => !x.value);
      const remainingLength = row.filter((x) => !x.value).length;
      if (key === 'back') {
        if (remainingLength === 5) return;
        const idx = lastEnteredIdx > -1 ? lastEnteredIdx - 1 : 4;
        row[idx] = {status: 'blank', value: ''};
      } else if (key === 'enter') {
        if (remainingLength !== 0) return;
        if (hardMode) {
          const missingHints = GameUtils.getMissingHints(newState, currentRowIdx);
          if (missingHints.length) {
            setInvalidTryCount((x) => x + 1);
            toasty(`word must contain ${missingHints.join(' ').toUpperCase()}`, 'gameState');
            return;
          }
        }
        if (!GameUtils.guessIsValid(row)) {
          setInvalidTryCount((x) => x + 1);
          toasty('not in word list', 'gameState');
          return;
        }
        row = GameUtils.updateRowStatus(row);
      } else if (remainingLength > 0) {
        row[lastEnteredIdx] = {status: 'attempt', value: key};
      }
      newState[currentRowIdx] = row;
      if (
        newState[currentRowIdx].map((x) => x.value + x.status).join('') !==
        gameState[currentRowIdx].map((x) => x.value + x.status).join('')
      ) {
        setGameState(newState);
      }

      if (GameUtils.hasFailed(newState)) {
        setTimeout(() => toasty(GameUtils.todaysSolution, 'gameState'), 2000);
      }
      const newStats = GameUtils.updateStats(statistics, newState);
      setStatistics(newStats);

      localStorage.setItem('gameState', JSON.stringify(newState));
      localStorage.setItem('statistics', JSON.stringify(newStats));
      localStorage.setItem('lastPlayed', Date.now().toString());
    },
    [gameState, statistics, hardMode],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.key === 'Enter') {
        onKeyPress('enter');
      } else if (e.key === 'Backspace') {
        onKeyPress('back');
      } else if (GameUtils.allKeysList.includes(e.key)) {
        onKeyPress(e.key);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyPress]);

  const onTogglePressEnabled = useCallback((isEnabled: boolean) => {
    pressEnabled.current = isEnabled;
  }, []);

  const onShare = useCallback(async () => {
    const data = {
      text: GameUtils.getShareText(gameState),
    };
    if (isMobileBrowser() && navigator.canShare(data)) {
      await navigator.share(data);
    } else {
      await navigator.clipboard.writeText(GameUtils.getShareText(gameState));
      toasty('copied to clipboard', 'notification');
    }
  }, [isGameOver]);

  const onToggleHardMode = useCallback(() => {
    if (isGameActive) {
      toasty('hard mode cannot be changed while game active', 'notification');
      return;
    }
    setGameState(GameUtils.getInitialBoardState(!hardMode));
    hardMode
      ? localStorage.removeItem('hardModeEnabled')
      : localStorage.setItem('hardModeEnabled', 'true');
    setHardMode(!hardMode);
  }, [hardMode, isGameActive]);

  return (
    <div className={'max-w-2xl px-5 mx-auto flex flex-col full-height'}>
      <Header
        onTogglePressEnabled={onTogglePressEnabled}
        statistics={statistics}
        isGameOver={GameUtils.hasFinished(gameState)}
        onShare={onShare}
        isHardMode={hardMode}
        onToggleHardMode={onToggleHardMode}
      />
      <Board gameState={gameState} invalidTryCount={invalidTryCount} />
      <Keyboard onKeyPress={onKeyPress} gameState={gameState} />
      <Toaster isGameOver={isGameOver} />
    </div>
  );
};
