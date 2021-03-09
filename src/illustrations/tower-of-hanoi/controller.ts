import Canvas from "src/models/canvas";

const DEBUG_MODE = false;

class Disk {
  static readonly THICKNESS: number = 15;
  readonly SIZE: number;

  private readonly canvas: Canvas;
  private readonly MAX_WIDTH: number;
  private readonly BORDER_COLOR: string = "pink";
  private readonly FILL_COLOR: string = "red";
  private readonly TEXT_COLOR: string = "black";
  private readonly BORDER_WIDTH: number = 2;
  private readonly OFFSET: number = 5;

  static readonly DISTANCE_OFFSET: number = 20;

  x: number;
  y: number;

  constructor(canvas: Canvas, size: number, x: number, bottomY: number) {
    this.canvas = canvas;
    this.MAX_WIDTH = canvas.width / 4 - Disk.DISTANCE_OFFSET;
    this.SIZE = size;
    this.x = x + Disk.DISTANCE_OFFSET / 2;
    this.y = bottomY - Disk.THICKNESS;
  }

  draw(): void {
    const {canvas, x, y, MAX_WIDTH, FILL_COLOR, BORDER_WIDTH, BORDER_COLOR} = this;
    if (DEBUG_MODE) {
      canvas.drawOutlineRect(
        x, y, MAX_WIDTH, Disk.THICKNESS, "white",
      );
    }
    canvas.drawFilledRect(
      x + (10 - this.SIZE) * this.OFFSET,
      y,
      MAX_WIDTH - 2 * (10 - this.SIZE) * this.OFFSET,
      Disk.THICKNESS,
      BORDER_COLOR
    );
    canvas.drawFilledRect(
      x + BORDER_WIDTH + (10 - this.SIZE) * this.OFFSET,
      y + BORDER_WIDTH,
      MAX_WIDTH - 2 * BORDER_WIDTH - 2 * (10 - this.SIZE) * this.OFFSET,
      Disk.THICKNESS - 2 * BORDER_WIDTH,
      FILL_COLOR
    );

    this.writeNumber();
  }

  writeNumber(): void {
    const {canvas, SIZE, x, y, MAX_WIDTH, TEXT_COLOR} = this;
    canvas.writeText(
      SIZE.toString(),
      x + MAX_WIDTH / 2 - 2,
      y + Disk.THICKNESS - 4,
      10,
      TEXT_COLOR,
    );
  }
}

class TowerStack {
  private readonly canvas: Canvas;
  private readonly x: number;
  private readonly y: number;
  private readonly bottomWidth: number;
  private readonly THICKNESS: number = 6;
  private readonly STACK_COLOR: string = "lightgray";
  private readonly TOP_LIMIT: number = 50;
  private readonly MOVEMENT_RATE: number = 3;

  private readonly disks: Disk[] = [];

  constructor(canvas: Canvas, count: number, disksCount: number = 0) {
    this.canvas = canvas;
    this.bottomWidth = canvas.width / 4;
    this.x = ((count - 1) * canvas.width / 3) + (canvas.width / 3 - this.bottomWidth) / 2;
    this.y = canvas.height * 5 / 6;

    for (let i = disksCount; i > 0; i--) {
      this.insertDisk(i);
    }
  }

  draw(): void {
    this.drawBase();
    this.drawRod();
  }

  drawBase(): void {
    const {canvas, x, y, bottomWidth, THICKNESS, STACK_COLOR} = this;
    canvas.drawFilledRect(x, y, bottomWidth, THICKNESS, STACK_COLOR);

    if (DEBUG_MODE) {
      canvas.drawLine(x, 0, x, canvas.height, 1, 'white');
      canvas.drawLine(x + bottomWidth, 0, x + bottomWidth, canvas.height, 1, 'white');
    }
  }

  drawRod(): void {
    const {canvas, x, y, bottomWidth, THICKNESS, STACK_COLOR} = this;
    const leftX = x + bottomWidth / 2 - THICKNESS / 2;
    const topY = y - canvas.height / 1.8;
    canvas.drawFilledRect(leftX, topY, THICKNESS, y - topY, STACK_COLOR);
  }

  drawDisks(): void {
    for (const disk of this.disks) {
      disk.draw();
    }
  }

  insertDisk(size: number): void {
    const x = this.x;
    const y = this.disks.length === 0 ? this.y : this.disks[this.disks.length - 1].y;

    const disk = new Disk(this.canvas, size, x, y);
    this.disks.push(disk);
  }

  moveToTop(move: Move): void {
    if (!move.up) {
      return;
    }
    const disk = this.disks[this.disks.length - 1];
    if (disk && disk.y > this.TOP_LIMIT) {
      disk.y -= this.MOVEMENT_RATE;
    } else {
      disk.y = this.TOP_LIMIT;
      move.up = false;
      move.horizontal = true;
    }
  }

  moveBetween(move: Move): void {
    if (!move.horizontal) {
      return;
    }
    const disk = this.disks[this.disks.length - 1];

    const cW = this.canvas.width;
    const to_x =
      ((move.To - 1) * cW / 3) +
      (cW / 3 - this.bottomWidth) / 2 +
      Disk.DISTANCE_OFFSET / 2;

    if (move.From < move.To) {
      if (disk.x < to_x - (to_x % this.MOVEMENT_RATE)) {
        disk.x += this.MOVEMENT_RATE;
      } else {
        disk.x = to_x;
        move.horizontal = false;
        move.down = true;
      }
    } else {
      if (disk.x > to_x - (to_x % this.MOVEMENT_RATE)) {
        disk.x -= this.MOVEMENT_RATE;
      } else {
        disk.x = to_x;
        move.horizontal = false;
        move.down = true;
      }
    }
  }

  moveToBottom(move: Move, toStack: TowerStack): void {
    if (!move.down) {
      return;
    }

    const topPosition = toStack.getTopPosition() - Disk.THICKNESS;
    const disk = this.disks[this.disks.length - 1];

    if (disk.y < topPosition) {
      disk.y += this.MOVEMENT_RATE;
    } else {
      disk.y = topPosition;
      move.down = false;
    }
  }

  getTopPosition(): number {
    if (this.disks.length === 0) {
      return this.y;
    }

    const topDisk = this.disks[this.disks.length - 1];
    return topDisk.y;
  }

  getTopDisk(): Disk | undefined {
    return this.disks.pop();
  }
}

class Move {
  up: boolean = true;
  horizontal: boolean = false;
  down: boolean = false;

  get completed() {
    return !this.up && !this.horizontal && !this.down;
  }

  get From() {
    return this.from;
  }

  get To() {
    return this.to;
  }

  constructor(private from: number, private to: number) {}
}

export default class Controller {
  private readonly canvas: Canvas;
  private interval = setTimeout(() => {}, 0);

  private readonly BG_COLOR = "black";
  private readonly INITIAL_DISKS_COUNT: number;

  private readonly stacks: TowerStack[] = [];

  private moves: Move[] = [];
  private currentMove?: Move;

  constructor(e: HTMLCanvasElement, disksCount: number = 5) {
    this.canvas = new Canvas(e);
    this.INITIAL_DISKS_COUNT = disksCount;

    this.drawBg();
    this.newStacks();
    this.drawStacks();
  }

  start(): void {
    this.stop();
    this.newStacks();
    this.generateMoves();
    this.currentMove = undefined;
    this.interval = setInterval(this.draw.bind(this), 16);
  }

  stop(): void {
    clearInterval(this.interval);
    clearInterval(this.interval);
  }

  reset(): void {
    this.stop();
    this.newStacks();
    this.drawBg();
    this.drawStacks();
  }

  newStacks(): void {
    // empty stacks
    while(this.stacks.length > 0) {
      this.stacks.pop();
    }

    // add stacks
    for (let i = 1; i <= 3; i++) {
      const disksCount = i === 1 ? this.INITIAL_DISKS_COUNT : 0;
      this.stacks.push(new TowerStack(this.canvas, i, disksCount));
    }
  }

  generateMoves(): void {
    // Empty the previous moves
    while (this.moves.length > 0) {
      this.moves.pop();
    }

    // Insert in reverse order so that each move is just popped from the end
    this.towerOfHanoi(this.INITIAL_DISKS_COUNT, 1, 2, 3);
    this.moves = this.moves.reverse();

    if (DEBUG_MODE) {
      for (const move of this.moves) {
        console.log(move.From, move.To);
      }
    }
  }

  private towerOfHanoi(n: number, src: number, aux: number, dest: number): void {
    if (n === 0) return;

    this.towerOfHanoi(n - 1, src, dest, aux);
    this.moves.push(new Move(src, dest));
    this.towerOfHanoi(n - 1, aux, src, dest);
  }

  draw(): void {
    this.drawBg();
    this.drawStacks();
    this.makeMove();
  }

  drawBg(): void {
    const {canvas, BG_COLOR} = this;
    canvas.drawFilledRect(0, 0, canvas.width, canvas.height, BG_COLOR);
  }

  drawStacks(): void {
    for (const stack of this.stacks) {
      stack.draw();
    }

    // Doing this here because when moving a disk from disk 1/2 to 3,
    // the disk is drawn before stack 3 is drawn.
    for (const stack of this.stacks) {
      stack.drawDisks();
    }
  }

  makeMove(): void {
    if (this.currentMove) {
      const from = this.stacks[this.currentMove.From - 1];
      const to = this.stacks[this.currentMove.To - 1];
      from.moveToTop(this.currentMove);
      from.moveBetween(this.currentMove);
      from.moveToBottom(this.currentMove, to);

      if (this.currentMove.completed) {
        const disk = from.getTopDisk();
        to.insertDisk((disk as Disk).SIZE);
        this.currentMove = undefined;
      }
    } else {
      if (this.moves.length === 0) {
        return;
      }
      this.currentMove = this.moves.pop();
    }
  }
}
