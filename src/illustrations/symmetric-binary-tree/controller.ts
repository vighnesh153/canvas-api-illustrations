import Canvas from "src/models/canvas";

export default class SymmetricBinaryTreeController {
  canvas: Canvas;

  lineWidth = 2;

  angle: number;
  branchLengthScaleDownFactor: number;
  initialBranchLength: number;

  constructor(
    canvasElement: HTMLCanvasElement,
    angle: number,
    lengthScaleDownFactor: number,
    initialBranchLength: number
  ) {
    this.canvas = new Canvas(canvasElement);
    // Draw background
    this.canvas.drawFilledRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
      "black"
    );
    this.angle = angle;
    this.branchLengthScaleDownFactor = lengthScaleDownFactor;
    this.initialBranchLength = initialBranchLength;
  }

  plot() {
    this.canvas.translate(this.canvas.width / 2, this.canvas.height - 2);
    this.draw(this.initialBranchLength);
  }

  draw(length: number) {
    this.canvas.drawLine(0, 0, 0, -length, this.lineWidth, "white");
    this.canvas.translate(0, -length);

    if (length < 4) {
      return;
    }

    this.canvas.pushState();
    this.canvas.rotate(this.angle);
    this.draw(length * this.branchLengthScaleDownFactor);
    this.canvas.popState();

    this.canvas.pushState();
    this.canvas.rotate(-this.angle);
    this.draw(length * this.branchLengthScaleDownFactor);
    this.canvas.popState();
  }
}
