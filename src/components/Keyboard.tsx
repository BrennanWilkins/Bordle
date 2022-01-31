import {ReactNode} from 'react';

export const Keyboard = () => {
  return (
    <div className={'pb-5 mt-10'}>
      <div className={'flex'}>
        {keys['0'].map((key) => (
          <KeyComponent key={key}>{key}</KeyComponent>
        ))}
      </div>
      <div className={'flex px-6'}>
        {keys['1'].map((key) => (
          <KeyComponent key={key}>{key}</KeyComponent>
        ))}
      </div>
      <div className={'flex'}>
        <KeyComponent isLarge>ENTER</KeyComponent>
        {keys['2'].map((key) => (
          <KeyComponent key={key}>{key}</KeyComponent>
        ))}
        <KeyComponent isLarge>
          <svg className={'w-5 h-5 fill-current'} viewBox="0 0 16 16">
            <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
            <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z" />
          </svg>
        </KeyComponent>
      </div>
    </div>
  );
};

const keys = {
  '0': ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  '1': ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  '2': ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
};

const KeyComponent = ({children, isLarge}: {children: ReactNode; isLarge?: boolean}) => {
  return (
    <div
      style={isLarge ? {flex: '1.4'} : {}}
      className={`rounded bg-gray-300 select-none text-sm h-14 flex items-center justify-center flex-shrink-1 flex-1 font-bold m-1 cursor-pointer`}
    >
      {children}
    </div>
  );
};
