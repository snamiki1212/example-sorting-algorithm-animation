import { useCallback, useEffect } from "react";

const KEY_CODES = {
  LEFT: 37,
  RIGHT: 39,
} as const;

const KEYDOWN_EVENT = "keydown";

type Props = {
  disabled: boolean;
  callbacks: { right: () => void; left: () => void };
};

export const useListenKeydown = ({ disabled, callbacks }: Props) => {
  const handleKeydown = useCallback(
    (event) => {
      if (disabled) return;
      if (event.keyCode === KEY_CODES.RIGHT) return callbacks.right();
      if (event.keyCode === KEY_CODES.LEFT) return callbacks.left();
    },
    [disabled, callbacks]
  );

  useEffect(() => {
    window.addEventListener(KEYDOWN_EVENT, handleKeydown);
    return () => window.removeEventListener(KEYDOWN_EVENT, handleKeydown);
  }, [handleKeydown]);

  return handleKeydown;
};
