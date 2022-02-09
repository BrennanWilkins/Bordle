import {TutorialModal} from './TutorialModal';
import {memo, useState} from 'react';
import {StatsModal} from './StatsModal';
import {Statistics} from '../logic/gameUtils';
import {useDidUpdate} from '../hooks/useDidUpdate';
import {SettingsModal} from './SettingsModal';

export const Header = memo(
  ({
    onTogglePressEnabled,
    statistics,
    isGameOver,
    onShare,
    isHardMode,
    onToggleHardMode,
  }: {
    onTogglePressEnabled: (isEnabled: boolean) => void;
    statistics: Statistics;
    isGameOver: boolean;
    onShare: () => Promise<void>;
    isHardMode: boolean;
    onToggleHardMode: () => void;
  }) => {
    const [showTutorial, setShowTutorial] = useState(() => {
      return !localStorage.getItem('lastPlayed');
    });
    const [showStats, setShowStats] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    useDidUpdate(() => {
      setTimeout(() => {
        setShowStats(true);
        onTogglePressEnabled(false);
      }, 3500);
    }, [statistics]);

    return (
      <>
        <header
          className={
            'w-full border-b p-5 pb-3 flex justify-between items-center border-gray-300 relative'
          }
        >
          <button
            onClick={() => {
              setShowTutorial(true);
              onTogglePressEnabled(false);
            }}
          >
            <svg
              className={
                'text-gray-600 w-6 h-6 cursor-pointer hover:text-gray-900 transition-colors fill-current'
              }
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
          </button>
          <h1
            className={
              'absolute inset-x-1/2 h-full -translate-x-1/2 top-0 flex items-center justify-center transform'
            }
          >
            BORDLE
          </h1>
          <div>
            <button
              onClick={() => {
                setShowStats(true);
                onTogglePressEnabled(false);
              }}
            >
              <svg
                className={
                  'text-gray-600 w-6 h-6 cursor-pointer hover:text-gray-900 transition-colors fill-current'
                }
                viewBox="0 0 16 16"
              >
                <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z" />
              </svg>
            </button>
            <button
              className={'ml-2'}
              onClick={() => {
                setShowSettings(true);
                onTogglePressEnabled(false);
              }}
            >
              <svg
                className={
                  'text-gray-600 w-6 h-6 cursor-pointer hover:text-gray-900 transition-colors fill-current'
                }
                viewBox="0 0 16 16"
              >
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
              </svg>
            </button>
          </div>
        </header>
        <TutorialModal
          show={showTutorial}
          close={() => {
            setShowTutorial(false);
            onTogglePressEnabled(true);
          }}
        />
        <StatsModal
          onShare={onShare}
          show={showStats}
          close={() => {
            setShowStats(false);
            onTogglePressEnabled(true);
          }}
          statistics={statistics}
          isGameOver={isGameOver}
        />
        <SettingsModal
          show={showSettings}
          close={() => {
            setShowSettings(false);
            onTogglePressEnabled(true);
          }}
          isHardMode={isHardMode}
          onToggleHardMode={onToggleHardMode}
        />
      </>
    );
  },
);
