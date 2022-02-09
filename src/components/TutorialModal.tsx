import {Tile} from './Tile';
import {ModalContainer} from './ModalContainer/ModalContainer';

export const TutorialModal = ({show, close}: {show: boolean; close: () => void}) => {
  return (
    <ModalContainer show={show} close={close}>
      <div>
        Guess the <b>BORDLE</b> in 6 tries.
      </div>
      <div className={'my-2'}>
        Each guess must be a valid 5 letter word. Hit the enter button to submit.
      </div>
      <div>
        After each guess, the color of the tiles will change to show how close your guess was to the
        word.
      </div>
      <div className={'mt-2'}>
        <b>Hard Mode:</b> if activated, you will have 5 tries to guess the Bordle.
      </div>
      <div className={'border-t border-gray-200 pt-2 mt-5'}>Examples:</div>
      <div className={'grid grid-cols-5 gap-1.5 mt-5 mb-1 max-w-[250px]'}>
        {'WEARY'.split('').map((char, idx) => (
          <Tile
            key={idx}
            animationDelay={400}
            animationEnabled={idx === 0}
            status={idx === 0 ? 'correct' : 'attempt'}
            animateOnMount
          >
            {char}
          </Tile>
        ))}
      </div>
      <div>
        The letter <b>W</b> is in the word and in the correct spot.
      </div>
      <div className={'grid grid-cols-5 gap-1.5 mt-5 mb-1 max-w-[250px]'}>
        {'PILLS'.split('').map((char, idx) => (
          <Tile
            key={idx}
            animationDelay={400}
            animationEnabled={idx === 1}
            status={idx === 1 ? 'present' : 'attempt'}
            animateOnMount
          >
            {char}
          </Tile>
        ))}
      </div>
      <div>
        The letter <b>I</b> is in the word and in the wrong spot.
      </div>
      <div className={'grid grid-cols-5 gap-1.5 mt-5 mb-1 max-w-[250px]'}>
        {'VAGUE'.split('').map((char, idx) => (
          <Tile
            key={idx}
            animationDelay={400}
            animationEnabled={idx === 3}
            status={idx === 3 ? 'absent' : 'attempt'}
            animateOnMount
          >
            {char}
          </Tile>
        ))}
      </div>
      <div>
        The letter <b>U</b> is not in the word in any spot.
      </div>
      <div className={'font-bold border-t border-gray-200 pt-5 mt-5'}>
        A new BORDLE will be available every day!
      </div>
    </ModalContainer>
  );
};
