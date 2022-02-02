import {useEffect, useRef} from 'react';
import {Tile} from './Tile';
import {GameState} from '../logic/gameUtils';

export const Board = ({gameState}: {gameState: GameState}) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => {
      if (!boardRef.current || !containerRef.current) return;
      const remainingHeight = containerRef.current.clientHeight;
      const remainingWidth = containerRef.current.clientWidth;
      boardRef.current.style.width =
        (remainingWidth < remainingHeight ? remainingWidth : remainingHeight) + 'px';
    };

    window.addEventListener('resize', onResize);
    onResize();
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className={'w-full flex flex-col justify-center flex-grow h-0'} ref={containerRef}>
      <div className={'w-full mx-auto max-w-sm flex justify-center'} ref={boardRef}>
        <div className={'grid grid-cols-5 gap-1.5 w-full grid-rows-5'}>
          {gameState.flat().map((tile, idx) => (
            <Tile key={idx} status={tile.status} index={idx % 5}>
              {tile.value}
            </Tile>
          ))}
        </div>
      </div>
    </div>
  );
};
