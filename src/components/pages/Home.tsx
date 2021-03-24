import { useState, useCallback, useEffect, useRef, forwardRef } from "react";
import { motion } from "framer-motion";
import { useSort } from "../../hooks/useSort";
import { useToggle } from "../../hooks/useToggle";
import { SORT_TYPE } from "../../models/Sorter";
import {
  Button,
  Select,
  Box,
  Center,
  Text,
  Switch,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

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

const NumberInputer = forwardRef((props: any, ref) => {
  return (
    <NumberInput {...props} ref={ref}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
});

const KEY_CODE_LIST = {
  LEFT: 37,
  RIGHT: 39,
} as const;

const useKeydown = ({
  disabled,
  callbacks,
}: {
  disabled: boolean;
  callbacks: { right: () => void; left: () => void };
}) => {
  const handleKeydown = useCallback(
    (event) => {
      if (disabled) return;
      if (event.keyCode === KEY_CODE_LIST.RIGHT) return callbacks.right();
      if (event.keyCode === KEY_CODE_LIST.LEFT) return callbacks.left();
    },
    [disabled, callbacks]
  );

  useEffect(() => {
    const event = "keydown";
    window.addEventListener(event, handleKeydown);
    return () => window.removeEventListener(event, handleKeydown);
  }, [handleKeydown]);

  return handleKeydown;
};

const useHandleFocus = () => {
  const ref = useRef(null);
  const { value: hasFocus, on, off } = useToggle(false);
  useEffect(() => {
    if (document.hasFocus() && ref?.current?.contains(document.activeElement)) {
      on();
    }
  }, [on]);

  return [hasFocus, { ref, onFocus: on, onBlur: off }] as const;
};

export function Home() {
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

  useKeydown({ disabled: hasFocus, callbacks: { right: next, left: prev } });

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
          <Box>
            <Switch isChecked={showNumber} onChange={toggleShowNumber} />
            <Text>Show Number</Text>
          </Box>
          <Button onClick={handleReset}>Reset</Button>
        </Center>
        <Box>
          <NumberInputer
            onChange={handleChangeLength}
            value={length}
            onFocus={onFocus}
            onBlur={onBlur}
            ref={ref}
          />
        </Box>
      </Box>

      <Box style={{ background: "lightblue" }}>
        <table
          className="charts-css column"
          style={{
            height: "300px",
          }}
        >
          <tbody>
            {items.map((item) => (
              <motion.tr
                key={item}
                layout
                animate="visible"
                variants={variants}
                transition={spring}
                style={
                  {
                    "--size": (item + 1) * columnBasis,
                    width: `${columnBasis}px`,
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
