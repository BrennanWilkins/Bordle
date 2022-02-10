import {useEffect, useState} from 'react';
import {GameUtils} from '../utils/gameUtils';

export const CountDownText = () => {
  const [countText, setCountText] = useState({
    hr: '00',
    min: '00',
    sec: '00',
  });

  useEffect(() => {
    const midnight = GameUtils.getMidnight();

    const onTick = () => {
      const distance = midnight - Date.now();

      const hr = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const sec = Math.floor((distance % (1000 * 60)) / 1000);

      setCountText({
        hr: `${hr < 10 ? '0' : ''}${hr}`,
        min: `${min < 10 ? '0' : ''}${min}`,
        sec: `${sec < 10 ? '0' : ''}${sec}`,
      });

      return distance;
    };

    const timer = setInterval(() => {
      const distance = onTick();
      if (distance < 0) {
        clearInterval(timer);
      }
    }, 1000);

    onTick();
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={'flex justify-center items-center text-center text-4xl w-40'}>
      <div>{countText.hr}</div>:<div>{countText.min}</div>:<div>{countText.sec}</div>
    </div>
  );
};
