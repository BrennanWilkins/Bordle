import {ReactNode, useEffect, useState} from 'react';
import {GameState, GameUtils, TileStatus} from '../logic/gameUtils';

export const Keyboard = ({
  onKeyPress,
  gameState,
}: {
  onKeyPress: (key: string) => void;
  gameState: GameState;
}) => {
  return (
    <div className={'pb-5 mt-10 -mx-3 -mb-3'}>
      <div className={'flex'}>
        {GameUtils.keyList['0'].map((key) => {
          return (
            <KeyComponent
              status={GameUtils.getKeyStatus(key, gameState)}
              key={key}
              onClick={() => onKeyPress(key)}
            >
              {key}
            </KeyComponent>
          );
        })}
      </div>
      <div className={'flex sm:px-6 px-4'}>
        {GameUtils.keyList['1'].map((key) => (
          <KeyComponent
            status={GameUtils.getKeyStatus(key, gameState)}
            key={key}
            onClick={() => onKeyPress(key)}
          >
            {key}
          </KeyComponent>
        ))}
      </div>
      <div className={'flex'}>
        <KeyComponent status={'blank'} isLarge onClick={() => onKeyPress('enter')}>
          ENTER
        </KeyComponent>
        {GameUtils.keyList['2'].map((key) => (
          <KeyComponent
            status={GameUtils.getKeyStatus(key, gameState)}
            key={key}
            onClick={() => onKeyPress(key)}
          >
            {key}
          </KeyComponent>
        ))}
        <KeyComponent status={'blank'} isLarge onClick={() => onKeyPress('back')}>
          <svg className={'w-5 h-5 fill-current'} viewBox="0 0 16 16">
            <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
            <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z" />
          </svg>
        </KeyComponent>
      </div>
    </div>
  );
};

const KeyComponent = ({
  children,
  isLarge,
  onClick,
  status,
}: {
  children: ReactNode;
  isLarge?: boolean;
  onClick: () => void;
  status: TileStatus;
}) => {
  const [shownStatus, setShownStatus] = useState('');

  useEffect(() => {
    setTimeout(() => setShownStatus(status), 250 * 6 + 100);
  }, [status]);

  return (
    <button
      onClick={onClick}
      style={isLarge ? {flex: '1.4'} : {}}
      className={`uppercase justify-center rounded-md select-none text-sm h-14 flex items-center justify-center flex-shrink-1 flex-1 font-bold m-[0.15rem] md:m-1 cursor-pointer ${
        shownStatus === 'correct'
          ? 'bg-green-600 text-white'
          : shownStatus === 'present'
          ? 'bg-yellow-500 text-white'
          : shownStatus === 'absent'
          ? 'bg-gray-500 text-white'
          : 'bg-gray-300 text-black'
      }`}
    >
      {children}
    </button>
  );
};
