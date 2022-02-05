import {DependencyList, useEffect, useRef} from 'react';

export const useDidUpdate = (effect: () => void, deps: DependencyList) => {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    effect();
  }, deps);
};
