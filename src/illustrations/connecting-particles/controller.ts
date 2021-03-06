import Canvas from "src/models/canvas";

const getRandomInt = (start: number, end: number) => {
  const diff = end - start;
  const randomOffset = Math.floor(Math.random() * diff);
  return randomOffset + start;
};

const euclideanDistance = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = x1 - x2;
  const dy = y1 - y2;

  return Math.sqrt(dx * dx + dy * dy);
};

class Particle {
  private x: number;
  private y: number;
  private readonly dx: number;
  private readonly dy: number;
  private readonly canvas: Canvas;

  private readonly color: string = "white";
  private readonly radius: number = 1;

  private readonly MAX_MOUSE_DISTANCE = 80;

  get X() {
    return this.x;
  }

  get Y() {
    return this.y;
  }

  constructor(canvas: Canvas) {
    this.x = getRandomInt(0, canvas.width);
    this.y = getRandomInt(0, canvas.height);
    this.canvas = canvas;

    this.dx = Math.random() * (Math.random() > 0.5 ? 1 : -1) / 2;
    this.dy = Math.random() * (Math.random() > 0.5 ? 1 : -1) / 2;
  }

  draw() {
    const {canvas, x, y, color, radius} = this;
    canvas.drawFilledCircle(x, y, radius, color);
  }

  update(mouseX: number, mouseY: number) {
    this.x += this.dx;
    this.y += this.dy;

    // Mouse Stuff
    const mdx = mouseX - this.x;
    const mdy = mouseY - this.y;

    const distanceToMouse = euclideanDistance(this.x, this.y, mouseX, mouseY);
    const cosTheta = mdx / distanceToMouse;
    const sinTheta = mdy / distanceToMouse;

    if (distanceToMouse < this.MAX_MOUSE_DISTANCE) {
      this.x = mouseX - (this.MAX_MOUSE_DISTANCE * cosTheta);
      this.y = mouseY - (this.MAX_MOUSE_DISTANCE * sinTheta);
    }

    this.x = (this.x + this.canvas.width) % this.canvas.width;
    this.y = (this.y + this.canvas.height) % this.canvas.height;
  }

  outOfBounds() {
    const {x, y, canvas} = this;
    const {width, height} = canvas;
    return x < 0 || x > width || y < 0 || y > height;
  }
}

export class ParticlesController {
  private readonly canvas: Canvas;
  private interval = setTimeout(() => {}, 0);

  private readonly bgColor: string = "black";
  private readonly lineColor = {
    r: "255",
    g: "255",
    b: "255",
  };
  private readonly lineWidth: number = 1;

  private readonly particles = new Set<Particle>();
  private readonly PARTICLES_IN_VIEW = 100;

  private mouseX: number = 100000;
  private mouseY: number = 100000;

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

  mouseOver(x: number, y: number): void {
    this.mouseX = x > 0 && x < this.canvas.width ? x : 100000;
    this.mouseY = y > 0 && y < this.canvas.height ? y : 100000;
  }

  draw(): void {
    this.drawBg();
    this.maintainParticlesCount();
    this.drawParticles();
    this.drawLines();
  }

  drawBg(): void {
    const {canvas, bgColor} = this;
    canvas.drawFilledRect(0, 0, canvas.width, canvas.height, bgColor);
  }

  drawParticles(): void {
    for (const particle of Array.from(this.particles)) {
      particle.update(this.mouseX, this.mouseY);
      particle.draw();
    }
  }

  drawLines(): void {
    const particles = Array.from(this.particles);
    const {lineColor, lineWidth} = this;
    const {r, g, b} = lineColor;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];

        const distance = euclideanDistance(p1.X, p1.Y, p2.X, p2.Y);
        const opacity = 10 / distance

        if (opacity > 0.1) {
          const color = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          this.canvas.drawLine(p1.X, p1.Y, p2.X, p2.Y, lineWidth, color);
        }
      }
    }
  }

  maintainParticlesCount() {
    const {canvas, particles, PARTICLES_IN_VIEW} = this;

    while (particles.size < PARTICLES_IN_VIEW) {
      particles.add(new Particle(canvas))
    }
  }
}
