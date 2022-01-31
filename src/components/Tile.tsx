import {ReactNode} from 'react';

export const Tile = ({children}: {children?: ReactNode}) => {
  return (
    <div className={'board-tile bg-white border-2 border-gray-300 w-full relative'}>
      <div
        className={
          'absolute inset-0 text-2xl font-bold w-full h-full flex justify-center items-center'
        }
      >
        {children}
      </div>
    </div>
  );
};
