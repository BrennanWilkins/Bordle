import React, {memo} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toaster = memo(({isGameOver}: {isGameOver: boolean}) => {
  return (
    <>
      <ToastContainer
        enableMultiContainer
        containerId={'notification'}
        position={'bottom-center'}
        autoClose={3000}
        hideProgressBar
        closeButton={false}
        style={{
          bottom: '1em',
        }}
        className={'toaster-container'}
        toastClassName={'toaster-toast'}
      />
      <ToastContainer
        enableMultiContainer
        containerId={'gameState'}
        position={'top-center'}
        autoClose={isGameOver ? false : 3000}
        hideProgressBar
        closeButton={false}
        style={{
          top: '1em',
        }}
        toastClassName={'toaster-toast'}
        className={'toaster-container'}
      />
    </>
  );
});

export const toasty = (text: string, type: 'gameState' | 'notification') => {
  toast(text, {containerId: type});
};
