import { useState, useEffect, useCallback } from "react";
import { Sorter, SORT_TYPE } from "../models/Sorter";

export const useSort = (type: SORT_TYPE = "BUBBLE") => {
  const [model, setModel] = useState<Sorter>(undefined);

  useEffect(() => {
    const sorter = Sorter.new().sort(type);
    setModel(sorter);
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

  const reset = useCallback(() => {
    const sorter = Sorter.new().sort(type);
    setModel(sorter);
  }, [type]);

  return {
    model,
    items,
    gotoFirst,
    gotoLast,
    prev,
    next,
    reset,
  };
};
