import {useRef} from 'react';
import {Tile} from './Tile';
import {GameState, GameUtils} from '../utils/gameUtils';
import {useResize} from '../hooks/useResize';

export const Board = ({
  gameState,
  invalidTryCount,
}: {
  gameState: GameState;
  invalidTryCount: number;
}) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useResize(() => {
    if (!boardRef.current || !containerRef.current) return;
    const remainingHeight = containerRef.current.clientHeight;
    const remainingWidth = containerRef.current.clientWidth;
    boardRef.current.style.width =
      (remainingWidth < remainingHeight ? remainingWidth : remainingHeight) + 'px';
  });

  const currentRow = GameUtils.getCurrentRowIdx(gameState);

  return (
    <div
      className={'w-full flex flex-col justify-center flex-grow h-0 board-container'}
      ref={containerRef}
    >
      <div className={'w-full mx-auto max-w-sm flex justify-center'} ref={boardRef}>
        <div className={`grid grid-cols-5 gap-1.5 w-full grid-rows-${gameState.length}`}>
          {gameState.flat().map((tile, idx) => (
            <Tile
              key={idx}
              status={tile.status}
              invalidTryCount={invalidTryCount}
              isCurrentRow={currentRow === Math.floor(idx / 5)}
              animationDelay={(idx % 5) * 250}
            >
              {tile.value}
            </Tile>
          ))}
        </div>
      </div>
    </div>
  );
};
