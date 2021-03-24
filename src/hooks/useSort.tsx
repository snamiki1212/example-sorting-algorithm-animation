import { useState, useEffect, useCallback } from "react";
import { Sorter } from "../models/Sorter";

export type SORT_TYPE = "BUBBLE" | "SELECTION" | "INSERTION";

export const useSort = (type: SORT_TYPE = "BUBBLE") => {
  const [model, setModel] = useState<Sorter>(undefined);

  useEffect(() => {
    const sorter = Sorter.new();
    if (type === "BUBBLE") return setModel(sorter.bubbleSort());
    if (type === "SELECTION") return setModel(sorter.selectionSort());
    if (type === "INSERTION") return setModel(sorter.insertionSort());
    throw new Error("sort type error");
  }, [type]);

  const items = model?.currentStep?.data ?? [];

  const gotoFirst = useCallback(() => {
    setModel((prev) => prev.gotoFirst());
  }, []);

  const gotoLast = useCallback(() => {
    setModel((prev) => prev.gotoLast());
  }, []);

  const prev = useCallback(() => {
    setModel((prev) => prev.prev());
  }, []);

  const next = useCallback(() => {
    setModel((prev) => prev.next());
  }, []);

  return {
    model,
    items,
    gotoFirst,
    gotoLast,
    prev,
    next,
  };
};
