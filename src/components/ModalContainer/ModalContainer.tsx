import {CSSTransition} from 'react-transition-group';
import './ModalContainer.css';
import {ReactNode} from 'react';

export const ModalContainer = ({
  show,
  close,
  children,
}: {
  show: boolean;
  close: () => void;
  children: ReactNode;
}) => {
  return (
    <>
      <CSSTransition
        in={show}
        timeout={300}
        className={'backdrop fixed inset-0 w-full h-full'}
        classNames={'backdrop'}
        unmountOnExit
      >
        <div />
      </CSSTransition>
      <CSSTransition in={show} timeout={300} classNames="modal" unmountOnExit>
        <div
          className={'fixed inset-0 z-50 overflow-hidden flex items-start p-5 pt-20 justify-center'}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              close();
            }
          }}
        >
          <div
            className={
              'modal-container rounded-lg shadow-2xl bg-white max-w-xl overflow-y-auto w-full relative z-10 p-5 pt-10'
            }
          >
            <button
              className={
                'absolute right-1 top-1 hover:text-gray-600 text-gray-400 transition-colors'
              }
              onClick={close}
            >
              <svg className={'w-10 h-10 fill-current'} viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
            {children}
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
