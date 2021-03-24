import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useSort } from "../hooks/useSort";
import { useToggle } from "../hooks/useToggle";
import { useListenKeydown } from "../hooks/useListenKeydown";
import { useHandleFocus } from "../hooks/useHandleFocus";
import { SORT_TYPE } from "../models/Sorter";
import { Button, Select, Box, Center, Text, Switch } from "@chakra-ui/react";
import { NumberInputer } from "./NumberInputer";

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300,
} as const;

const OPTIONS: { value: SORT_TYPE; text: string }[] = [
  { value: "BUBBLE", text: "Bubble Sort" },
  { value: "SELECTION", text: "Selection Sort" },
  { value: "INSERTION", text: "Insertion Sort" },
];

export function HomePage() {
  const [length, setLength] = useState<number>(10);
  const [sortType, setSortType] = useState<SORT_TYPE>("INSERTION");
  const { model, items, gotoFirst, gotoLast, next, prev, reset } = useSort({
    type: sortType,
    length,
  });
  const columnBasis = items.length === 0 ? 0 : 1 / items.length;

  const { value: showNumber, toggle: toggleShowNumber } = useToggle(false);

  const handleReset = useCallback(() => {
    if (!window.confirm("Do you want to reset this data?")) return;
    reset();
  }, [reset]);

  const handleSelectSortType = useCallback((e) => {
    setSortType(e.target.value);
  }, []);

  const handleChangeLength = useCallback((value) => {
    setLength(value);
  }, []);

  const [hasFocus, { ref, onFocus, onBlur }] = useHandleFocus();

  useListenKeydown({
    disabled: hasFocus,
    callbacks: { right: next, left: prev },
  });

  return (
    <Box style={{ background: "pink" }}>
      <Box>
        <Center>
          <Select onChange={handleSelectSortType}>
            {OPTIONS.map(({ value, text }) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))}
          </Select>
        </Center>
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
          <Box>
            <Switch isChecked={showNumber} onChange={toggleShowNumber} />
            <Text>Show Number</Text>
          </Box>
          <Button onClick={handleReset}>Reset</Button>
          <NumberInputer
            onChange={handleChangeLength}
            value={length}
            onFocus={onFocus}
            onBlur={onBlur}
            ref={ref}
          />
        </Center>
      </Box>

      <Box style={{ background: "lightblue" }}>
        <table
          className="charts-css column"
          style={{
            height: "500px",
          }}
        >
          <tbody>
            {items.map((item) => (
              <motion.tr
                key={item}
                layout
                transition={spring}
                style={
                  {
                    "--size": (item + 1) * columnBasis,
                  } as any
                }
              >
                <td>{showNumber && item + 1}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}
