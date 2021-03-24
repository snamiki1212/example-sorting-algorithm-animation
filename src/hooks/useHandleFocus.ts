import { useEffect, useRef } from "react";
import { useToggle } from "./useToggle";

export const useHandleFocus = () => {
  const ref = useRef(null);
  const { value: hasFocus, on, off } = useToggle(false);
  useEffect(() => {
    if (document.hasFocus() && ref?.current?.contains(document.activeElement)) {
      on();
    }
  }, [on]);

  return [hasFocus, { ref, onFocus: on, onBlur: off }] as const;
};
