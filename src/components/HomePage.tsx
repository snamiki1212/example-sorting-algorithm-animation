import { useState, useCallback } from "react";
import { useSort } from "../hooks/useSort";
import { useToggle } from "../hooks/useToggle";
import { useListenKeydown } from "../hooks/useListenKeydown";
import { useHandleFocus } from "../hooks/useHandleFocus";
import { SORT_TYPE } from "../models/Sorter";
import {
  Button,
  Select,
  Box,
  Flex,
  Center,
  Text,
  Switch,
} from "@chakra-ui/react";
import { NumberInputer } from "./NumberInputer";
import { Canvas } from "./Canvas";

const OPTIONS: { value: SORT_TYPE; text: string }[] = [
  { value: "BUBBLE", text: "Bubble Sort" },
  { value: "SELECTION", text: "Selection Sort" },
  { value: "INSERTION", text: "Insertion Sort" },
];

const inRange = (num: Number) => num >= 0 && num <= 100;

export function HomePage() {
  const [length, setLength] = useState<number>(10);
  const [sortType, setSortType] = useState<SORT_TYPE>("INSERTION");
  const { model, items, gotoFirst, gotoLast, next, prev, reset } = useSort({
    type: sortType,
    length,
  });

  const { value: showNumber, toggle: toggleShowNumber } = useToggle(false);

  const handleReset = useCallback(() => {
    if (!window.confirm("Do you want to reset this data?")) return;
    reset();
  }, [reset]);

  const handleSelectSortType = useCallback((e) => {
    setSortType(e.target.value);
  }, []);

  const handleChangeLength = useCallback((value) => {
    if (!inRange(value)) return;
    setLength(value);
  }, []);

  const [hasFocus, { ref, onFocus, onBlur }] = useHandleFocus();

  useListenKeydown({
    disabled: hasFocus,
    callbacks: { right: next, left: prev },
  });

  return (
    <Box p={5}>
      <Box border="solid" borderWidth={1} borderColor="gray.300" p={5} my={2}>
        <Center my={2}>
          <Select onChange={handleSelectSortType}>
            {OPTIONS.map(({ value, text }) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))}
          </Select>
        </Center>
        <Center my={2}>
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
        <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap="2rem">
          <Flex alignItems="center">
            <Text>Show Number</Text>
            <Switch isChecked={showNumber} onChange={toggleShowNumber} ml={3} />
          </Flex>
          <Flex alignItems="center">
            <Text>Item Number</Text>
            <NumberInputer
              onChange={handleChangeLength}
              value={length}
              onFocus={onFocus}
              onBlur={onBlur}
              ref={ref}
            />
          </Flex>
          <Button onClick={handleReset}>Regenerate</Button>
        </Box>
      </Box>
      <Box>
        <Canvas data={items} options={{ showNumber }} />
      </Box>
    </Box>
  );
}
