import Canvas from "src/models/canvas";
import {
  getBubbleSortGenerator,
  getInsertionSortGenerator,
  getMergeSortGenerator,
  getSelectionSortGenerator,
} from "./visualizer";

interface SortAlgorithmMeta {
  function: (o: SortingVisualizerController) => Generator;
  timer: number;
}

export default class SortingVisualizerController {
  canvas: Canvas;

  arraySize = 166;
  minimumLength = 2;
  array: number[];
  color: string[];

  offsetFromGround = 10;
  selectedSortAlgorithm = "bubble";
  animationRunning = false;

  interval: NodeJS.Timeout;

  map: { [key: string]: SortAlgorithmMeta } = {
    bubble: {
      function: getBubbleSortGenerator,
      timer: 10,
    },
    merge: {
      function: getMergeSortGenerator,
      timer: 30,
    },
    selection: {
      function: getSelectionSortGenerator,
      timer: 50,
    },
    insertion: {
      function: getInsertionSortGenerator,
      timer: 10,
    },
  };

  constructor(canvasEl: HTMLCanvasElement) {
    this.color = [];
    this.array = [];
    this.canvas = new Canvas(canvasEl);
    this.randomizeArray();
    this.interval = setTimeout(() => {}, 0);
  }

  isArraySorted() {
    let prev = -Infinity;
    let isSorted = true;

    this.array.forEach((value) => {
      if (value < prev) {
        isSorted = false;
      }
      prev = value;
    });

    return isSorted;
  }

  startAnimation() {
    if (this.isArraySorted()) {
      return;
    }

    this.animationRunning = true;
    const generatorObject = this.map[this.selectedSortAlgorithm].function(this);
    const timer = this.map[this.selectedSortAlgorithm].timer;

    this.interval = setInterval(() => {
      if (generatorObject.next().done) {
        this.stopAnimation();
      }
    }, timer);
  }

  clearBackground() {
    this.canvas.drawFilledRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
      "black"
    );
  }

  generateRandomArray() {
    this.stopAnimation();
    this.array = [];
    this.color = [];
    const maxHeight = this.canvas.height - 50 - this.offsetFromGround;
    const { floor, random } = Math;

    for (let i = 0; i < this.arraySize; i++) {
      this.array.push(floor(random() * maxHeight) + this.offsetFromGround);
      this.color.push("white");
    }
  }

  plotArray(array?: number[]) {
    if (array === undefined) {
      array = this.array;
    }
    this.clearBackground();
    array.forEach((value: number, index: number) => {
      value += this.minimumLength;
      this.canvas.drawFilledRect(
        index * 3,
        this.canvas.height - value,
        2,
        value - this.offsetFromGround,
        this.color[index]
      );
    });
  }

  randomizeArray() {
    this.generateRandomArray();
    this.plotArray();
  }

  stopAnimation() {
    this.animationRunning = false;
    clearInterval(this.interval);
    clearInterval(this.interval);
    this.resetColor();
    this.plotArray();
  }

  resetColor() {
    this.color.forEach((v, i) => {
      this.color[i] = "white";
    });
  }
}
