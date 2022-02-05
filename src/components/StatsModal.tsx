import {ModalContainer} from './ModalContainer/ModalContainer';
import {GameUtils, Statistics} from '../logic/gameUtils';

export const StatsModal = ({
  show,
  close,
  statistics,
}: {
  show: boolean;
  close: () => void;
  statistics: Statistics;
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
    </ModalContainer>
  );
};
