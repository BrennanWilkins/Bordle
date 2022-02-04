import {ReactNode, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {TileStatus} from '../logic/gameUtils';

export const Tile = ({
  children,
  status,
  animationEnabled = true,
  index,
  invalidTryCount,
  isCurrentRow,
}: {
  children?: ReactNode;
  status: TileStatus;
  animationEnabled?: boolean;
  index: number;
  invalidTryCount?: number;
  isCurrentRow?: boolean;
}) => {
  const [shownStatus, setShownStatus] = useState('blank');
  const [animateClass, setAnimateClass] = useState('');
  const animationDelay = useRef((index % 5) * 250);
  const lastInvalidTryCount = useRef(invalidTryCount);

  useEffect(() => {
    animationDelay.current = (index % 5) * 250;
  }, [index]);

  useEffect(() => {
    if (lastInvalidTryCount.current === invalidTryCount) return;
    if (isCurrentRow) {
      setAnimateClass('shake');
      setTimeout(() => setAnimateClass(''), 800);
    }
    lastInvalidTryCount.current = invalidTryCount;
  }, [invalidTryCount, isCurrentRow]);

  useLayoutEffect(() => {
    if (!animationEnabled) {
      setShownStatus(status);
      return;
    }
    if (shownStatus === 'attempt' && status === 'blank') {
      setShownStatus(status);
    } else if (status === 'attempt') {
      setShownStatus(status);
      setAnimateClass('pop-in');
      setTimeout(() => setAnimateClass(''), 250);
    } else if (status !== 'blank') {
      setTimeout(() => {
        setAnimateClass('flip-in');
        setTimeout(() => {
          setShownStatus(status);
          setAnimateClass('flip-out');
        }, 250);
      }, animationDelay.current);
    }
  }, [status]);

  return (
    <div className={`board-tile w-full relative`}>
      <div
        className={`${animateClass} uppercase absolute z-20 inset-0 border-2 text-2xl font-bold w-full h-full flex justify-center items-center ${
          shownStatus === 'correct'
            ? 'bg-green-600 text-white border-green-600'
            : shownStatus === 'absent'
            ? 'bg-gray-500 text-white border-gray-500'
            : shownStatus === 'present'
            ? 'bg-yellow-500 text-white border-yellow-500'
            : shownStatus === 'attempt'
            ? `bg-white border-gray-300`
            : 'bg-white border-gray-200'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
