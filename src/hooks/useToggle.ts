import { useState, useCallback } from "react";

export const useToggle = (defaultValue = true) => {
  const [value, setValue] = useState(defaultValue);
  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const on = useCallback(() => setValue(true), []);
  const off = useCallback(() => setValue(false), []);
  return { value, toggle, on, off };
};
