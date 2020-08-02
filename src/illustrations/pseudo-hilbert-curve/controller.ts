import Canvas from "src/models/canvas";

class Point {
  constructor(public x: number, public y: number) {}
}

export default class HilbertCurveController {
  canvas: Canvas;

  order: number;
  lineThickness = 1;
  squaresCount: number;
  totalPoints: number;

  done = false;

  hilbertIndices: Point[] = [
    new Point(0, 0),
    new Point(0, 1),
    new Point(1, 1),
    new Point(1, 0),
  ];

  points: Point[];
  framesCounter = 0;

  stopper: () => void;

  constructor(
    canvasElement: HTMLCanvasElement,
    order: number,
    stopper: () => void
  ) {
    this.canvas = new Canvas(canvasElement);
    // Draw background
    this.canvas.drawFilledRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
      "white"
    );

    this.order = order;
    this.squaresCount = 2 ** order;
    this.totalPoints = this.squaresCount ** 2;
    this.points = new Array(this.totalPoints);
    this.stopper = stopper;
    this.generatePoints();
  }

  getHilbertIndex(index: number) {
    const ref = this.hilbertIndices[index & 3];
    const firstOrderPoint = new Point(ref.x, ref.y);

    for (let j = 1; j < this.order; j++) {
      index >>= 2;
      const length = 2 ** j;

      switch (index & 3) {
        case 0:
          [firstOrderPoint.x, firstOrderPoint.y] = [
            firstOrderPoint.y,
            firstOrderPoint.x,
          ];
          break;
        case 1:
          firstOrderPoint.y += length;
          break;
        case 2:
          firstOrderPoint.x += length;
          firstOrderPoint.y += length;
          break;
        case 3:
          [firstOrderPoint.x, firstOrderPoint.y] = [
            length - 1 - firstOrderPoint.y,
            length - 1 - firstOrderPoint.x,
          ];
          firstOrderPoint.x += length;
      }
    }

    return firstOrderPoint;
  }

  generatePoints() {
    const length = this.canvas.height / this.squaresCount;

    for (let i = 0; i < this.totalPoints; i++) {
      const point = this.getHilbertIndex(i);
      point.x *= length;
      point.y *= length;

      // Offset
      point.x += (this.canvas.width - length * (this.squaresCount - 1)) / 2;
      point.y += (this.canvas.height - length * (this.squaresCount - 1)) / 2;

      this.points[i] = point;
    }
  }

  plot() {
    if (this.done) {
      return;
    }
    let prev = this.points[0];
    const { min } = Math;

    for (let i = 1; i < min(this.framesCounter, this.points.length); i++) {
      const current = this.points[i];
      this.canvas.drawLine(
        prev.x,
        prev.y,
        current.x,
        current.y,
        this.lineThickness,
        "darkblue"
      );
      prev = current;
    }
  }

  update() {
    if (this.done) {
      return;
    }
    this.framesCounter++;
    if (this.framesCounter > this.points.length) {
      this.done = true;
      this.points = [];
    }
  }
}
