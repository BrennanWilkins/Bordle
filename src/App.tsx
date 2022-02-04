import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Header} from './components/Header';
import {Keyboard} from './components/Keyboard';
import {Board} from './components/Board';
import {GameState, GameUtils, keyList} from './logic/gameUtils';
import {SOLUTIONS, VALID_GUESSES} from './logic/wordList';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [answer, setAnswer] = useState(GameUtils.todaysSolution);
  const [gameState, setGameState] = useState<GameState>(GameUtils.initialBoardState);
  const [invalidTryCount, setInvalidTryCount] = useState(0);
  const pressEnabled = useRef(false);

  const onKeyPress = useCallback(
    (key: string) => {
      if (!pressEnabled.current) return;
      if (gameState.find((row) => row.every((x) => x.status === 'correct'))) return;
      const newState = gameState.map((x) => [...x]);
      const currentRow = newState.findIndex((row) =>
        row.some((x) => x.status === 'blank' || x.status === 'attempt'),
      );
      let row = newState[currentRow];
      const lastEnteredIdx = row.findIndex((x) => !x.value);
      const remainingLength = row.filter((x) => !x.value).length;
      if (key === 'back') {
        if (remainingLength === 5) return;
        const idx = lastEnteredIdx > -1 ? lastEnteredIdx - 1 : 4;
        row[idx] = {status: 'blank', value: ''};
      } else if (key === 'enter') {
        if (remainingLength === 0) {
          const word = row.map((x) => x.value).join('');
          const isValid = VALID_GUESSES.includes(word) || SOLUTIONS.includes(word);
          if (!isValid) {
            setInvalidTryCount((x) => x + 1);
            toast('not in word list');
            return;
          }
          row = row.map((guess, idx) => ({
            status:
              guess.value === answer[idx]
                ? 'correct'
                : answer.includes(guess.value)
                ? 'present'
                : 'absent',
            value: guess.value,
          }));
        }
      } else if (remainingLength > 0) {
        row[lastEnteredIdx] = {status: 'attempt', value: key};
      }
      newState[currentRow] = row;
      setGameState(newState);
    },
    [answer, gameState],
  );

  useEffect(() => {
    const onKeyDown = (e: any) => {
      if (e.repeat) return;
      if (e.key === 'Enter') {
        onKeyPress('enter');
      } else if (e.key === 'Backspace') {
        onKeyPress('back');
      } else if ([...keyList['0'], ...keyList['1'], ...keyList['2']].includes(e.key)) {
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

  return (
    <div className={'max-w-2xl px-5 mx-auto flex flex-col min-h-screen'}>
      <Header onTogglePressEnabled={onTogglePressEnabled} />
      <Board gameState={gameState} invalidTryCount={invalidTryCount} />
      <Keyboard onKeyPress={onKeyPress} gameState={gameState} />
      <ToastContainer
        position={'top-center'}
        autoClose={3000}
        hideProgressBar
        closeButton={false}
        style={{maxWidth: '200px'}}
        toastStyle={{
          color: 'white',
          backgroundColor: 'rgb(75 85 99)',
          textAlign: 'center',
        }}
      />
    </div>
  );
};
