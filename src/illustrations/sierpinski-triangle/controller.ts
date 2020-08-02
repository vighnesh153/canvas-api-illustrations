import Canvas from "src/models/canvas";

interface Point {
  x: number;
  y: number;
}

export default class SierpinskiTriangleController {
  canvas: Canvas;
  a: Point = { x: 250, y: 50 };
  b: Point = { x: 100, y: 250 };
  c: Point = { x: 400, y: 250 };

  next: Point = { x: this.a.x, y: this.a.y };

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = new Canvas(canvasElement);
    // Draw background
    this.canvas.drawFilledRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
      "black"
    );

    // Initial points
    const initialPointsColor = "red";
    this.canvas.drawFilledCircle(this.a.x, this.a.y, 2, initialPointsColor);
    this.canvas.drawFilledCircle(this.b.x, this.b.y, 2, initialPointsColor);
    this.canvas.drawFilledCircle(this.c.x, this.c.y, 2, initialPointsColor);
  }

  plot() {
    this.canvas.drawFilledCircle(this.next.x, this.next.y, 1, "white");
  }

  update() {
    const points = [this.a, this.b, this.c];
    const randomIndex = Math.floor(Math.random() * 3);

    const newX = (points[randomIndex].x + this.next.x) / 2;
    const newY = (points[randomIndex].y + this.next.y) / 2;

    this.next.x = newX;
    this.next.y = newY;
  }
}
