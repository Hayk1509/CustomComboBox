import { useCallback, useRef } from "react";

export const useDebounce = () => {
  const timer = useRef<number | undefined>(undefined);
  const debounce = useCallback((callback: () => void, ms = 1000) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      callback();
    }, ms);
  }, []);

  return debounce;
};
