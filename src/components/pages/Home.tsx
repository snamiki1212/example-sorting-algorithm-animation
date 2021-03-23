import { motion, useMotionValue, useTransform } from "framer-motion";

export function Home() {
  // const x = useMotionValue(0);
  // const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);
  return (
    <div style={{ background: "pink" }}>
      this is Top
      <motion.div
        drag="x"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          loop: Infinity,
          repeatDelay: 1,
        }}
        style={{ width: "100px", height: "100px", background: "red" }}
      >
        OK
      </motion.div>
    </div>
  );
}
