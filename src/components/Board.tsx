import {useEffect, useRef} from 'react';
import {Tile} from './Tile';

export const Board = () => {
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
    <div
      className={'w-full flex flex-col justify-center flex-grow overflow-hidden h-0'}
      ref={containerRef}
    >
      <div className={'w-full mx-auto max-w-sm flex justify-center overflow-hidden'} ref={boardRef}>
        <div className={'grid grid-cols-5 gap-1.5 w-full grid-rows-5'}>
          {Array(25)
            .fill(null)
            .map((_, idx) => (
              <Tile key={idx} status={'blank'} />
            ))}
        </div>
      </div>
    </div>
  );
};
