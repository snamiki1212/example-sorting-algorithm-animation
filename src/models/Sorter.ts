import { immerable, produce } from "immer";
import { shuffle } from "../utils/array";

type Step = {
  data: number[];
};

export type SORT_TYPE = "BUBBLE" | "SELECTION" | "INSERTION";

export class Sorter {
  [immerable] = true;
  list: number[];
  steps: Record<number, Step>;
  stepsLength = 0;
  isSorted = false;
  currentStepIdx = 0;

  constructor(list: number[]) {
    this.list = list;
  }

  static new(length = 10) {
    const list = shuffle(Array.from({ length }, (_, idx) => idx));
    return new this(list);
  }

  get canPrev() {
    if (!this.isSorted) return false;
    if (this.currentStepIdx <= 0) return false;
    return true;
  }

  get canNext() {
    if (!this.isSorted) return false;
    if (this.stepsLength - 1 <= this.currentStepIdx) return false;
    return true;
  }

  get currentStep() {
    return this.steps[this.currentStepIdx];
  }

  next() {
    return produce(this, (draft) => {
      if (!this.canNext) return draft;
      draft.currentStepIdx++;
    });
  }

  prev() {
    return produce(this, (draft) => {
      if (!this.canPrev) return draft;
      draft.currentStepIdx--;
    });
  }

  gotoFirst() {
    return produce(this, (draft) => {
      if (!this.isSorted) return draft;
      draft.currentStepIdx = 0;
    });
  }

  gotoLast() {
    return produce(this, (draft) => {
      if (!this.isSorted) return draft;
      draft.currentStepIdx = draft.stepsLength - 1;
    });
  }

  sort(type: SORT_TYPE) {
    return produce(this, (draft) => {
      if (type === "BUBBLE") return draft.bubbleSort();
      if (type === "SELECTION") return draft.selectionSort();
      if (type === "INSERTION") return draft.insertionSort();
      throw new Error("sort type error");
    });
  }

  bubbleSort() {
    if (this.isSorted) return this;
    let list = [...this.list];
    const __steps = {};
    let __no = 0;
    Object.assign(__steps, { [__no++]: { data: [...list] } });
    for (let j = 0; j < list.length; j++) {
      for (let i = list.length - 1; i > j; i--) {
        if (list[i] < list[i - 1]) {
          [list[i], list[i - 1]] = [list[i - 1], list[i]];
          Object.assign(__steps, { [__no++]: { data: [...list] } });
        }
      }
    }
    return produce(this, (draft) => {
      draft.isSorted = true;
      draft.steps = __steps;
      draft.stepsLength = __no;
    });
  }

  selectionSort() {
    if (this.isSorted) return this;
    let list = [...this.list];
    const __steps = {};
    let __no = 0;
    Object.assign(__steps, { [__no++]: { data: [...list] } });
    for (let j = 0; j < list.length; j++) {
      let min = Infinity;
      let minIdx = -1;
      for (let i = j; i < list.length; i++) {
        if (min > list[i]) {
          min = list[i];
          minIdx = i;
        }
      }
      if (minIdx === j) continue;
      [list[minIdx], list[j]] = [list[j], list[minIdx]];
      Object.assign(__steps, { [__no++]: { data: [...list] } });
    }
    return produce(this, (draft) => {
      draft.isSorted = true;
      draft.steps = __steps;
      draft.stepsLength = __no;
    });
  }

  insertionSort() {
    if (this.isSorted) return this;
    const list = [...this.list];
    const __steps = {};
    let __no = 0;
    Object.assign(__steps, { [__no++]: { data: [...list] } });
    for (let i = 1; i < list.length; i++) {
      for (let j = i; j > 0; j--) {
        if (list[j - 1] < list[j]) break;
        [list[j], list[j - 1]] = [list[j - 1], list[j]];
        Object.assign(__steps, { [__no++]: { data: [...list] } });
      }
    }
    return produce(this, (draft) => {
      draft.isSorted = true;
      draft.steps = __steps;
      draft.stepsLength = __no;
    });
  }
}
