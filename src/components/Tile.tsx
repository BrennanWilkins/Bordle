import {ReactNode, useEffect, useState} from 'react';

export const Tile = ({
  children,
  status,
  animationEnabled = true,
}: {
  children?: ReactNode;
  status: 'correct' | 'absent' | 'present' | 'blank' | 'attempt';
  animationEnabled?: boolean;
}) => {
  const [shownStatus, setShownStatus] = useState('blank');
  const [animateClass, setAnimateClass] = useState('');

  useEffect(() => {
    if (!animationEnabled) {
      setShownStatus(status);
      return;
    }
    if (status !== 'attempt' && status !== 'blank') {
      setAnimateClass('flip-in');
      setTimeout(() => {
        setShownStatus(status);
        setAnimateClass('flip-out');
      }, 250);
    } else {
      setShownStatus(status);
      setAnimateClass('pop-in');
    }
  }, [status]);

  return (
    <div key={animateClass} className={`board-tile w-full relative ${animateClass}`}>
      <div
        className={`absolute inset-0 border-2 text-2xl font-bold w-full h-full flex justify-center items-center ${
          shownStatus !== 'blank' && shownStatus !== 'attempt' ? 'text-white' : ''
        } ${
          shownStatus === 'correct'
            ? 'bg-green-600 border-green-600'
            : shownStatus === 'absent'
            ? 'bg-gray-500 border-gray-500'
            : shownStatus === 'present'
            ? 'bg-yellow-500 border-yellow-500'
            : shownStatus === 'attempt'
            ? 'bg-white border-gray-300'
            : 'bg-white border-gray-200'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
