import {useEffect, useState} from 'react';

export const CountDownText = () => {
  const [countText, setCountText] = useState('');

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0);
    tomorrow.setMinutes(0);
    tomorrow.setSeconds(0);
    tomorrow.setMilliseconds(0);
    const midnight = tomorrow.getTime();

    const onTick = () => {
      const distance = midnight - Date.now();

      const hr = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const sec = Math.floor((distance % (1000 * 60)) / 1000);

      setCountText(
        `${hr < 10 ? '0' : ''}${hr}:${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`,
      );

      return distance;
    };

    const timer = setInterval(() => {
      const distance = onTick();
      if (distance < 0) {
        clearInterval(timer);
        window.location.reload();
      }
    }, 1000);

    onTick();
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div className={'text-3xl text-center'}>{countText}</div>;
};
