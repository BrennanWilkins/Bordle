import {ReactNode, useEffect, useState} from 'react';
import {TileStatus} from '../logic/gameUtils';

export const Tile = ({
  children,
  status,
  animationEnabled = true,
  index,
}: {
  children?: ReactNode;
  status: TileStatus;
  animationEnabled?: boolean;
  index: number;
}) => {
  const [shownStatus, setShownStatus] = useState('blank');
  const [animateClass, setAnimateClass] = useState('');

  useEffect(() => {
    if (!animationEnabled) {
      setShownStatus(status);
      return;
    }
    if (status === 'attempt') {
      setShownStatus(status);
      setAnimateClass('pop-in');
    } else if (status !== 'blank') {
      setAnimateClass('flip-in');
      setTimeout(() => {
        setShownStatus(status);
        setAnimateClass('flip-out');
      }, 250);
    }
  }, [status]);

  return (
    <div key={animateClass} className={`board-tile w-full relative`}>
      <div
        // style={{animationDelay: `${index * 100}ms`}}
        className={`${animateClass} uppercase absolute z-20 inset-0 border-2 text-2xl font-bold w-full h-full flex justify-center items-center ${
          shownStatus === 'correct'
            ? 'bg-green-600 text-white border-green-600'
            : shownStatus === 'absent'
            ? 'bg-gray-500 text-white border-gray-500'
            : shownStatus === 'present'
            ? 'bg-yellow-500 text-white border-yellow-500'
            : shownStatus === 'attempt'
            ? `bg-white border-gray-300 ${animationEnabled ? 'pop-in' : ''}`
            : 'bg-white border-gray-200'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
