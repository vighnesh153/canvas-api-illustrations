import Canvas from "src/models/canvas";

export default class Controller {
  private readonly canvas: Canvas;
  private interval = setTimeout(() => {}, 0);

  constructor(e: HTMLCanvasElement) {
    this.canvas = new Canvas(e);
  }

  start(): void {
    this.interval = setInterval(this.draw.bind(this), 16);
  }

  stop(): void {
    clearInterval(this.interval);
    clearInterval(this.interval);
  }

  draw(): void {

  }
}
