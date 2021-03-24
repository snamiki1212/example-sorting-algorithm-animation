import { useState, useEffect, useCallback } from "react";
import { Sorter, SORT_TYPE } from "../models/Sorter";

export const useSort = ({
  type = "BUBBLE",
  length = 10,
}: {
  type: SORT_TYPE;
  length?: number;
}) => {
  const [model, setModel] = useState<Sorter>(undefined);

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
    const sorter = Sorter.new(length).sort(type);
    setModel(sorter);
  }, [length, type]);

  useEffect(() => {
    reset();
  }, [reset]);

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
