import Canvas from "src/models/canvas";

const getRandomInt = (start: number, end: number) => {
  const diff = end - start;
  const randomOffset = Math.floor(Math.random() * diff);
  return randomOffset + start;
};

class Star {
  private readonly canvas: Canvas;

  private readonly MIN_RADIUS = 1;
  private readonly MAX_RADIUS = 4;

  private readonly radius: number;
  private readonly color = Object.freeze({
    r: 255,
    g: 255,
    b: 255,
  });
  private x: number;
  private y: number;
  private opacity: number = 1;
  private dx: number = Math.random() * (Math.random() > 0.5 ? 1 : -1) / 10;
  private dy: number = Math.random() * (Math.random() > 0.5 ? 1 : -1) / 10;
  private dOpacity: number = Math.random() / 50;

  constructor(canvas: Canvas) {
    this.canvas = canvas;

    this.x = getRandomInt(0, canvas.width);
    this.y = getRandomInt(0, canvas.height);
    this.radius = getRandomInt(this.MIN_RADIUS, this.MAX_RADIUS);
  }

  update(): void {
    this.surfThroughSpace();
    this.twinkle();
  }

  private surfThroughSpace(): void {
    this.x += this.dx;
    this.y += this.dy;

    this.x = (this.x + this.canvas.width) % this.canvas.width;
    this.y = (this.y + this.canvas.height) % this.canvas.height;
  }

  private twinkle(): void {
    this.opacity += this.dOpacity;

    if (this.opacity >= 1) {
      this.dOpacity = -Math.abs(this.dOpacity)
    }
    if (this.opacity <= 0) {
      this.dOpacity = Math.abs(this.dOpacity);
    }
  }

  draw(): void {
    const {canvas, x, y, radius, color, opacity} = this;
    const {r, g, b} = color;
    canvas.drawFilledCircle(x, y, radius, `rgba(${r}, ${g}, ${b}, ${opacity})`);
  }
}

export default class Controller {
  private readonly canvas: Canvas;
  private interval = setTimeout(() => {}, 0);

  private readonly BG_COLOR = "black";
  private readonly STARS_COUNT = 100;
  private readonly stars: Star[] = [];

  constructor(e: HTMLCanvasElement) {
    this.canvas = new Canvas(e);
  }

  start(): void {
    this.newStars();
    this.interval = setInterval(this.draw.bind(this), 16);
  }

  stop(): void {
    clearInterval(this.interval);
    clearInterval(this.interval);
  }

  newStars(): void {
    // remove existing
    while (this.stars.length > 0) {
      this.stars.pop();
    }

    // add new stars
    while (this.stars.length < this.STARS_COUNT) {
      this.stars.push(new Star(this.canvas));
    }
  }

  draw(): void {
    this.drawBg();
    this.drawStars();
  }

  drawBg(): void {
    const {canvas, BG_COLOR} = this;
    canvas.drawFilledRect(0, 0, canvas.width, canvas.height, BG_COLOR);
  }

  drawStars(): void {
    for (const star of this.stars) {
      star.update();
      star.draw();
    }
  }
}
