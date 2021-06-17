import * as React from 'react';

interface UseKeyObserverProps {
  isCtrlKeyDown: boolean;
  isShiftKeyDown: boolean;
}

const useKeyObserver = (): UseKeyObserverProps => {
  const [isShiftKeyDown, setIsShiftKeyDown] = React.useState<boolean>(false);
  const [isCtrlKeyDown, setIsCtrlKeyDown] = React.useState<boolean>(false);

  const pressShift = () => setIsShiftKeyDown(true);
  const releaseShift = () => setIsShiftKeyDown(false);

  const pressCtrl = () => setIsCtrlKeyDown(true);
  const releaseCtrl = () => setIsCtrlKeyDown(false);

  const observeKeyDown = (event: KeyboardEvent): void => {
    if (event.shiftKey) {
      pressShift();
    }

    if (event.ctrlKey) {
      pressCtrl();
    }
  };

  const observeKeyUp = (): void => {
    releaseShift();
    releaseCtrl();
  };

  React.useEffect(() => {
    window.addEventListener('keydown', observeKeyDown);
    window.addEventListener('keyup', observeKeyUp);

    return () => {
      window.removeEventListener('keydown', observeKeyDown);
      window.removeEventListener('keyup', observeKeyUp);
    };
  }, []);

  return {
    isCtrlKeyDown,
    isShiftKeyDown,
  };
};

export default useKeyObserver;
