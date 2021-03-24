import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useSort } from "../../hooks/useSort";
import { SORT_TYPE } from "../../models/Sorter";
import { Button, Select, Box, Center } from "@chakra-ui/react";

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300,
} as const;

const variants = {
  visible: (idx) => ({
    opacity: 1,
    transition: {
      transform: `translate3d(${idx * 5}px, 0, 0)`,
    },
  }),
  hidden: { opacity: 0 },
} as const;

const OPTIONS: { value: SORT_TYPE; text: string }[] = [
  { value: "BUBBLE", text: "Bubble Sort" },
  { value: "SELECTION", text: "Selection Sort" },
  { value: "INSERTION", text: "Insertion Sort" },
];

export function Home() {
  const [sortType, setSortType] = useState<SORT_TYPE>("INSERTION");
  const { model, items, gotoFirst, gotoLast, next, prev, reset } = useSort(
    sortType
  );

  const handleReset = useCallback(() => {
    if (window.confirm("Do you want to reset this data?")) reset();
  }, [reset]);

  const handleSelectSortType = useCallback((e) => {
    setSortType(e.target.value);
  }, []);

  return (
    <Box style={{ background: "pink" }}>
      <Box>
        <Box>
          <Select onChange={handleSelectSortType}>
            {OPTIONS.map(({ value, text }) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))}
          </Select>
        </Box>
        <Center>
          <Button onClick={gotoFirst} disabled={!model?.canPrev}>
            {`<<`}
          </Button>
          <Button onClick={prev} disabled={!model?.canPrev}>
            {`<`}
          </Button>
          <Button onClick={next} disabled={!model?.canNext}>
            {`>`}
          </Button>
          <Button onClick={gotoLast} disabled={!model?.canNext}>
            {`>>`}
          </Button>
        </Center>
        <Center>
          <Button onClick={handleReset}>Reset</Button>
        </Center>
      </Box>

      <Box style={{ background: "lightblue" }}>
        <table
          id="column-example-1"
          className="charts-css column"
          style={{
            height: "200px",
            maxWidth: "300px",
            margin: "0 auto",
          }}
        >
          <caption> Column Example #1 </caption>
          <tbody>
            {items.map((item) => (
              <motion.tr
                key={item}
                animate="visible"
                variants={variants}
                layout
                transition={spring}
                style={{ "--size": item * 0.1 + 0.1 } as any}
              >
                <td>{item}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}
