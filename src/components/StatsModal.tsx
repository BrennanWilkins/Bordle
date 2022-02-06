import {ModalContainer} from './ModalContainer/ModalContainer';
import {GameUtils, Statistics} from '../logic/gameUtils';
import {CountDownText} from './CountDownText';

export const StatsModal = ({
  show,
  close,
  statistics,
  isGameOver,
  onShare,
}: {
  show: boolean;
  close: () => void;
  statistics: Statistics;
  isGameOver: boolean;
  onShare: () => Promise<void>;
}) => {
  const highestGuess = GameUtils.getHighestGuess(statistics);

  return (
    <ModalContainer show={show} close={close}>
      <h3>STATISTICS</h3>
      <div className={'grid gap-2 text-center max-w-md mx-auto my-5 grid-cols-4'}>
        <div>
          <div className={'text-2xl font-semibold'}>{statistics.gamesPlayed}</div> Played
        </div>
        <div>
          <div className={'text-2xl font-semibold'}>{GameUtils.getWinPercentage(statistics)}</div>{' '}
          Win %
        </div>
        <div>
          <div className={'text-2xl font-semibold'}>{statistics.streak}</div> Current Streak
        </div>
        <div>
          <div className={'text-2xl font-semibold'}>{statistics.maxStreak}</div> Max Streak
        </div>
      </div>
      <h3>GUESS DISTRIBUTION</h3>
      <div className={'max-w-md mx-auto px-2 my-2'}>
        {Object.entries(statistics.guesses).map((guess) => (
          <div className={'flex items-center my-2'} key={guess[0]}>
            <div className={'mr-1'}>{guess[0]}</div>
            <div
              style={{width: `calc(${(guess[1] * 100) / highestGuess}% - 10px)`, minWidth: '25px'}}
              className={`flex justify-end text-white font-semibold text-base px-2 ${
                guess[1] === 0 ? 'bg-gray-500' : 'bg-green-600'
              }`}
            >
              {guess[1]}
            </div>
          </div>
        ))}
      </div>
      {isGameOver && (
        <div className={'flex justify-center mt-5'}>
          <div>
            <h3>NEXT BORDLE</h3>
            <CountDownText />
          </div>
          <div className={'border-r mx-8 border-gray-500'} />
          <button
            onClick={onShare}
            className={
              'rounded-md bg-green-600 text-white py-4 px-6 font-bold text-2xl flex items-center'
            }
          >
            share
            <svg className={'ml-2 w-6 h-6 fill-current'} viewBox="0 0 16 16">
              <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
            </svg>
          </button>
        </div>
      )}
    </ModalContainer>
  );
};
