
import { useCallback, useRef } from "react";

function useThrottle(callback, delay = 1000) {
  const lastCall = useRef(0);
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  return useCallback(
    (...args) => {
      const now = Date.now();

      if (now - lastCall.current < delay) {
        return;
      }

      lastCall.current = now;
      callbackRef.current(...args);
    },
    [delay]
  );
}

export default useThrottle;
