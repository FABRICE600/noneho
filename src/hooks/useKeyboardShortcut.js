
import { useEffect } from "react";

function useKeyboardShortcut(key, callback) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key.toLowerCase() === key.toLowerCase()) {
        callback(event);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, callback]);
}

export default useKeyboardShortcut;
