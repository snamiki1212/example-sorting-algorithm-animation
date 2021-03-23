import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const ITEMS = Array.from({ length: 10 }, (_, idx) => idx);

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

export function Home() {
  const [items, setItems] = useState(ITEMS);
  const reverse = () => setItems((prev) => [...prev].reverse());

  const variants = {
    visible: (idx) => ({
      opacity: 1,
      transition: {
        transform: `translate3d(${idx * 5}px, 0, 0)`,
      },
    }),
    hidden: { opacity: 0 },
  };

  return (
    <div style={{ background: "pink" }}>
      this is Top
      <button onClick={reverse}>reverse</button>
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
