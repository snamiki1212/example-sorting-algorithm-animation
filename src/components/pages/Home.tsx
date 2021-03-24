import { useState, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { BubbleSort } from "../../models/BubbleSort";

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

const useBubbleSort = () => {
  const [model, setModel] = useState(() => BubbleSort.new().bubbleSort());
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
  const { model, items, gotoFirst, gotoLast, next, prev } = useBubbleSort();
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
