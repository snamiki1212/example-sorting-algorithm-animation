import { useState, useCallback } from "react";
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

type SORT_TYPE = "BUBBLE" | "SELECTION";

const useSort = (type: SORT_TYPE = "BUBBLE") => {
  const [model, setModel] = useState(() => {
    const sorter = Sorter.new();
    if (type === "BUBBLE") return sorter.bubbleSort();
    if (type === "SELECTION") return sorter.selectionSort();
    throw new Error("sort type error");
  });

  const items = model.currentStep.data;

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

export function Home() {
  const { model, items, gotoFirst, gotoLast, next, prev } = useSort(
    "SELECTION"
  );
  return (
    <div style={{ background: "pink" }}>
      <button onClick={gotoFirst} disabled={!model.canPrev}>{`<<`}</button>
      <button onClick={prev} disabled={!model.canPrev}>
        {`<`}
      </button>
      <button onClick={next} disabled={!model.canNext}>
        {`>`}
      </button>
      <button onClick={gotoLast} disabled={!model.canNext}>{`>>`}</button>
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
