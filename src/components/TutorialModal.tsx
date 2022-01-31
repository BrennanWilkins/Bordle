import {Tile} from './Tile';

export const TutorialModal = ({show, close}: {show: boolean; close: () => void}) => {
  return (
    <div className={'fixed w-full h-full inset-0 p-5 flex justify-center items-center z-10'}>
      <div className={'bg-white opacity-50 w-full h-full absolute inset-0'} onClick={close} />
      <div className={'rounded-lg shadow-2xl bg-white max-w-xl w-full relative z-10 p-5 pt-10'}>
        <button
          className={'absolute right-1 top-1 hover:text-gray-600 text-gray-400 transition-colors'}
          onClick={close}
        >
          <svg className={'w-10 h-10 fill-current'} viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
        <div>
          Guess the <b>BORDLE</b> in 6 tries.
        </div>
        <div>Each guess must be a valid 5 letter word. Hit the enter button to submit.</div>
        <div>
          After each guess, the color of the tiles will change to show how close your guess was to
          the word.
        </div>
        <div className={'border-t border-gray-200 pt-2 mt-5'}>Examples:</div>
        <div className={'grid grid-cols-5 gap-1.5 mt-5 mb-1'} style={{maxWidth: '250px'}}>
          {'WEARY'.split('').map((char, idx) => (
            <Tile key={idx}>{char}</Tile>
          ))}
        </div>
        <div>
          The letter <b>W</b> is in the word and in the correct spot.
        </div>
        <div className={'grid grid-cols-5 gap-1.5 mt-5 mb-1'} style={{maxWidth: '250px'}}>
          {'PILLS'.split('').map((char, idx) => (
            <Tile key={idx}>{char}</Tile>
          ))}
        </div>
        <div>
          The letter <b>I</b> is in the word and in the wrong spot.
        </div>
        <div className={'grid grid-cols-5 gap-1.5 mt-5 mb-1'} style={{maxWidth: '250px'}}>
          {'VAGUE'.split('').map((char, idx) => (
            <Tile key={idx}>{char}</Tile>
          ))}
        </div>
        <div>
          The letter <b>U</b> is not in the word in any spot.
        </div>
        <div className={'font-bold border-t border-gray-200 pt-5 mt-5'}>
          A new BORDLE will be available every day!
        </div>
      </div>
    </div>
  );
};
