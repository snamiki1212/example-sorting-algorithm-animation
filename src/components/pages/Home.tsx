import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const ITEMS = Array.from({ length: 10 }, (_, idx) => idx);

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
  // const x = useMotionValue(0);
  // const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);
  return (
    <div style={{ background: "pink" }}>
      this is Top
      <button onClick={reverse}>reverse</button>
      {items.map((item) => (
        <motion.div key={item} animate="visible" variants={variants} layout>
          {item}
        </motion.div>
      ))}
    </div>
  );
}
