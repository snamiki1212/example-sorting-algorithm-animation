import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Sorter } from "../../models/Sorter";

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

const variants = {
  visible: (idx) => ({
    opacity: 1,
    transition: {
      transform: `translate3d(${idx * 5}px, 0, 0)`,
    },
  }),
  hidden: { opacity: 0 },
};

type SORT_TYPE = "BUBBLE" | "SELECTION" | "INSERTION";

const useSort = (type: SORT_TYPE = "BUBBLE") => {
  const [model, setModel] = useState<Sorter>(undefined);

  useEffect(() => {
    console.log("recreate");
    const sorter = Sorter.new();
    if (type === "BUBBLE") return setModel(sorter.bubbleSort());
    if (type === "SELECTION") return setModel(sorter.selectionSort());
    if (type === "INSERTION") return setModel(sorter.insertionSort());
    throw new Error("sort type error");
  }, [type]);

  const items = model?.currentStep?.data ?? [];
  console.log("MODEL", model);

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

const OPTIONS: { value: SORT_TYPE; text: string }[] = [
  { value: "BUBBLE", text: "Bubble Sort" },
  { value: "SELECTION", text: "Selection Sort" },
  { value: "INSERTION", text: "Insertion Sort" },
];

export function Home() {
  const [sortType, setSortType] = useState<SORT_TYPE>("INSERTION");
  const { model, items, gotoFirst, gotoLast, next, prev } = useSort(sortType);

  const handleSelectSortType = useCallback((e) => {
    setSortType(e.target.value);
  }, []);

  return (
    <div style={{ background: "pink" }}>
      <div>
        <select onChange={handleSelectSortType}>
          {OPTIONS.map(({ value, text }) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={gotoFirst} disabled={!model?.canPrev}>{`<<`}</button>
        <button onClick={prev} disabled={!model?.canPrev}>
          {`<`}
        </button>
        <button onClick={next} disabled={!model?.canNext}>
          {`>`}
        </button>
        <button onClick={gotoLast} disabled={!model?.canNext}>{`>>`}</button>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {items.map((item) => (
          <motion.div
            key={item}
            animate="visible"
            variants={variants}
            layout
            transition={spring}
          >
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
