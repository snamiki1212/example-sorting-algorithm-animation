import { immerable, produce } from "immer";

// TODO: move to utils file
function shuffle<T>(_list: T[]) {
  let list = [..._list];
  let currentIdx = list.length;
  while (currentIdx > 0) {
    const randomIdx = Math.floor(Math.random() * currentIdx);
    currentIdx -= 1;
    [list[randomIdx], list[currentIdx]] = [list[currentIdx], list[randomIdx]];
  }
  return list;
}

type Step = {
  data: number[];
};

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
    if (!this.isSorted) return false; // sort before to call next
    if (this.currentStepIdx <= 0) return false; // Cannot prev because current idx indicates first one
    return true;
  }

  get canNext() {
    if (!this.isSorted) return false; //Sort before to call next
    if (this.stepsLength - 1 <= this.currentStepIdx) return false; // Cannot next because current idx indicates last one
    return true;
  }

  next() {
    if (!this.canNext) return this;
    return produce(this, (draft) => {
      draft.currentStepIdx++;
    });
  }

  prev() {
    if (!this.canPrev) return this;
    return produce(this, (draft) => {
      draft.currentStepIdx--;
    });
  }

  gotoFirst() {
    if (!this.isSorted) return this;
    return produce(this, (draft) => {
      draft.currentStepIdx = 0;
    });
  }

  gotoLast() {
    if (!this.isSorted) return this;
    return produce(this, (draft) => {
      draft.currentStepIdx = draft.stepsLength - 1;
    });
  }

  get currentStep() {
    return this.steps[this.currentStepIdx];
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
}
