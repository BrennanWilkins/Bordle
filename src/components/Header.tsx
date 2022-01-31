import {TutorialModal} from './TutorialModal';
import {useState} from 'react';

export const Header = () => {
  const [showTutorial, setShowTutorial] = useState(true);
  return (
    <>
      <header
        className={
          'sm:text-4xl text-3xl w-full tracking-wider border-b p-5 flex justify-between items-center border-gray-300 font-bold mb-10'
        }
      >
        <svg
          onClick={() => setShowTutorial(true)}
          className={
            'text-gray-600 w-6 h-6 cursor-pointer hover:text-gray-900 transition-colors fill-current'
          }
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
        </svg>
        <div>BORDLE</div>
        <svg
          className={
            'text-gray-600 w-6 h-6 cursor-pointer hover:text-gray-900 transition-colors fill-current'
          }
          viewBox="0 0 16 16"
        >
          <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z" />
        </svg>
      </header>
      <TutorialModal show={showTutorial} close={() => setShowTutorial(false)} />
    </>
  );
};
