import {useEffect} from 'react';

export const useResize = (onResize: () => void) => {
  useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
};
