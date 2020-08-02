import SortingVisualizerController from "./controller";

export const getBubbleSortGenerator = (object: SortingVisualizerController) => {
  function* bubbleSortGenerator() {
    for (let i = 0; i < object.array.length; i++) {
      for (let j = 0; j < object.array.length - i - 1; j++) {
        const v1 = object.array[j];
        const v2 = object.array[j + 1];

        if (v1 > v2) {
          [object.array[j], object.array[j + 1]] = [
            object.array[j + 1],
            object.array[j],
          ];
          object.color[j] = object.color[j + 1] = "red";
          object.plotArray();
          yield;
          object.color[j] = object.color[j + 1] = "white";
        }
      }
    }
    object.plotArray();
  }
  return bubbleSortGenerator();
};

export const getMergeSortGenerator = (object: SortingVisualizerController) => {
  function plotArray(
    array: number[],
    s1: number,
    i: number,
    j: number,
    e1: number,
    e2: number
  ) {
    const tempArr = [
      ...object.array.slice(0, s1),
      ...array.slice(0, array.length),
      ...object.array.slice(i, e1 + 1),
      ...object.array.slice(j, object.array.length),
    ];

    object.plotArray(tempArr);
  }

  function* mergeSortGenerator(start: number, end: number) {
    if (start === end) {
      return;
    }

    const mid = Math.floor((start + end) / 2);
    for (const _ of mergeSortGenerator(start, mid)) {
      yield;
    }
    for (const _ of mergeSortGenerator(mid + 1, end)) {
      yield;
    }
    for (const _ of merge(start, mid, mid + 1, end)) {
      yield;
    }
    object.plotArray();
  }

  function* merge(s1: number, e1: number, s2: number, e2: number) {
    const newArray = [];
    let i = s1;
    let j = s2;

    while (i <= e1 && j <= e2) {
      if (object.array[i] < object.array[j]) {
        newArray.push(object.array[i++]);
      } else {
        newArray.push(object.array[j++]);
      }
      object.color[i] = object.color[j] = "red";
      plotArray(newArray, s1, i, j, e1, e2);
      object.color[i] = object.color[j] = "white";
      yield;
    }

    while (i <= e1) {
      newArray.push(object.array[i++]);
      object.color[i] = "red";
      plotArray(newArray, s1, i, j, e1, e2);
      object.color[i] = "white";
      yield;
    }

    while (j <= e2) {
      newArray.push(object.array[j++]);
      object.color[j - 1] = "red";
      plotArray(newArray, s1, i, j, e1, e2);
      object.color[j - 1] = "white";
      yield;
    }

    newArray.forEach((value, index) => {
      object.array[index + s1] = value;
    });
  }

  return mergeSortGenerator(0, object.array.length - 1);
};

export const getSelectionSortGenerator = (
  object: SortingVisualizerController
) => {
  function* selectionSortGenerator() {
    for (let i = 0; i < object.array.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < object.array.length; j++) {
        const v1 = object.array[minIndex];
        const v2 = object.array[j];

        if (v2 < v1) {
          object.color[j] = object.color[minIndex] = "red";
          object.plotArray();
          yield;
          object.color[j] = object.color[minIndex] = "white";
          minIndex = j;
        }
      }
      [object.array[minIndex], object.array[i]] = [
        object.array[i],
        object.array[minIndex],
      ];
    }
    object.plotArray();
  }
  return selectionSortGenerator();
};

export const getInsertionSortGenerator = (
  object: SortingVisualizerController
) => {
  function* insertionSortGenerator() {
    const { array } = object;
    for (let i = 1; i < array.length; i++) {
      for (let j = i - 1; j >= 0; j--) {
        if (array[j + 1] < array[j]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          object.color[j] = object.color[j + 1] = "red";
          object.plotArray();
          yield;
          object.color[j] = object.color[j + 1] = "white";
        }
      }
    }

    object.plotArray();
  }
  return insertionSortGenerator();
};
