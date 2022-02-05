import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Header} from './components/Header';
import {Keyboard} from './components/Keyboard';
import {Board} from './components/Board';
import {GameState, GameUtils} from './logic/gameUtils';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [gameState, setGameState] = useState<GameState>(GameUtils.initialBoardState);
  const [invalidTryCount, setInvalidTryCount] = useState(0);
  const pressEnabled = useRef(false);

  const onKeyPress = useCallback(
    (key: string) => {
      if (!pressEnabled.current || GameUtils.hasWon(gameState)) return;
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
        if (remainingLength === 0) {
          const isValid = GameUtils.guessIsValid(row);
          if (!isValid) {
            setInvalidTryCount((x) => x + 1);
            toast('not in word list');
            return;
          }
          row = GameUtils.updateRowStatus(row);
        }
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
    },
    [gameState],
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
          backgroundColor: 'rgb(75,85,99)',
          textAlign: 'center',
        }}
      />
    </div>
  );
};
