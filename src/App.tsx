import React from 'react';
import {Header} from './components/Header';
import {Keyboard} from './components/Keyboard';
import {Board} from './components/Board';

export const App = () => {
  return (
    <div className={'max-w-2xl px-5 mx-auto flex flex-col min-h-screen'}>
      <Header />
      <Board />
      <Keyboard onKeyPress={(key) => console.log(key)} />
    </div>
  );
};
