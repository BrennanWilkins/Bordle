import {ModalContainer} from './ModalContainer/ModalContainer';

export const SettingsModal = ({
  show,
  close,
  isHardMode,
  onToggleHardMode,
}: {
  show: boolean;
  close: () => void;
  isHardMode: boolean;
  onToggleHardMode: () => void;
}) => {
  return (
    <ModalContainer show={show} close={close}>
      <h3>SETTINGS</h3>
      <div className={'flex justify-center items-center mt-5'}>
        <span className={'mr-3'}>Hard Mode</span>
        <ToggleSwitch isChecked={isHardMode} onClick={onToggleHardMode} />
      </div>
    </ModalContainer>
  );
};

const ToggleSwitch = ({isChecked, onClick}: {isChecked: boolean; onClick: () => void}) => (
  <div
    className={`relative w-16 h-9 rounded-full ${isChecked ? 'bg-green-600' : 'bg-gray-500'}`}
    onClick={onClick}
  >
    <span
      className={`absolute cursor-pointer h-7 w-7 top-1 inset-0 bg-white duration-300 rounded-full ${
        isChecked ? 'translate-x-8' : 'translate-x-1'
      }`}
    />
  </div>
);
