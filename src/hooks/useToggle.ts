import { useReducer } from "react";

export const useToggle = (defaultValue = true) =>
  useReducer((prev) => !prev, defaultValue);
