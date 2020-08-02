import Canvas from "src/models/canvas";
import { Queue } from "src/models/queue";

const colors = {
  visited: "lightblue",
  start: "green",
  end: "red",
  wall: "black",
  defaultCell: "white",
  currentPointer: "yellow",
  pathNodeColor: "yellow",
};

class Cell {
  static readonly size = 20;

  color = colors.defaultCell;
  isWall = false;
  isVisited = false;

  constructor(
    public row: number,
    public column: number,
    public canvas: Canvas
  ) {
    this.row = row;
    this.column = column;
  }

  draw() {
    const { canvas, row, column, color } = this;
    const { size } = Cell;

    canvas.drawFilledRect(column * size, row * size, size - 1, size - 1, color);
  }
}

export class GridPathFindingVisualizerController {
  canvas: Canvas;
  grid: Cell[][];
  animationRunning = false;

  columnCount: number;
  rowCount: number;

  start: Cell | null;
  end: Cell | null;

  interval: NodeJS.Timeout;

  constructor(canvasEl: HTMLCanvasElement) {
    this.canvas = new Canvas(canvasEl);
    this.columnCount = this.canvas.width / Cell.size;
    this.rowCount = this.canvas.height / Cell.size;

    this.grid = [];
    this.generateGrid();

    this.start = this.end = null;
    this.generateRandomStartAndEnd();
    this.generateRandomWalls();
    this.drawGrid();

    this.interval = setTimeout(() => {}, 0);
  }

  startAnimation() {
    for (const row of this.grid) {
      for (const cell of row) {
        if (cell.isVisited) {
          cell.color = colors.defaultCell;
        }
        cell.isVisited = false;
      }
    }
    (this.start as Cell).color = colors.start;
    (this.end as Cell).color = colors.end;

    this.animationRunning = true;
    const generatorObject = this.bfs();

    this.interval = setInterval(() => {
      if (generatorObject.next().done) {
        this.stopAnimation();
      }
      this.drawGrid();
    }, 50);
  }

  stopAnimation() {
    clearInterval(this.interval);
    clearInterval(this.interval);
    this.animationRunning = false;
  }

  generateRandomStartAndEnd() {
    this.stopAnimation();

    const { grid, rowCount, columnCount } = this;
    const randomFunc = (n: number) => {
      const { floor, random } = Math;
      return floor(random() * n);
    };

    if (this.start) {
      this.start.color = colors.defaultCell;
    }

    if (this.end) {
      this.end.color = colors.defaultCell;
    }

    this.start = null;
    while (this.start === null || this.start.isWall) {
      this.start = grid[randomFunc(rowCount)][randomFunc(columnCount)];
    }
    this.end = null;
    while (this.end === null || this.end.isWall || this.end === this.start) {
      this.end = grid[randomFunc(rowCount)][randomFunc(columnCount)];
    }

    for (const row of this.grid) {
      for (const cell of row) {
        if (cell.isVisited) {
          cell.isVisited = false;
          cell.color = colors.defaultCell;
        }
      }
    }

    this.start.color = colors.start;
    this.end.color = colors.end;
    this.drawGrid();
  }

  generateRandomWalls() {
    this.resetGrid();
    const { start, end } = this;

    for (const row of this.grid) {
      for (const cell of row) {
        cell.isWall = Math.random() < 0.3 && cell !== start && cell !== end;
        cell.color = cell.isWall ? colors.wall : colors.defaultCell;
      }
    }

    (this.start as Cell).color = colors.start;
    (this.end as Cell).color = colors.end;
    this.drawGrid();
  }

  generateGrid() {
    this.grid = [];
    const { canvas, rowCount, columnCount } = this;

    for (let i = 0; i < rowCount; i++) {
      this.grid.push([]);
      for (let j = 0; j < columnCount; j++) {
        const cell = new Cell(i, j, canvas);
        this.grid[i].push(cell);
      }
    }
  }

  drawGrid() {
    this.clearBackground();

    for (const row of this.grid) {
      for (const cell of row) {
        cell.draw();
      }
    }
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

  resetGrid() {
    this.stopAnimation();

    this.grid.forEach((row) => {
      row.forEach((cell) => {
        cell.isVisited = false;
        cell.isWall = false;
        cell.color = colors.defaultCell;
      });
    });
    if (this.start) {
      this.start.color = colors.start;
    }
    if (this.end) {
      this.end.color = colors.end;
    }
    this.drawGrid();
  }

  *bfs() {
    interface Data {
      curr: Cell | null;
      from: Cell | null;
    }

    const queue = new Queue<Data>();
    queue.enqueue({ curr: this.start, from: null });
    let found = false;

    const parents: { [key: number]: Cell | null } = {};

    while (!queue.isEmpty()) {
      const data = queue.dequeue() as Data;
      const cell = data.curr as Cell;

      if (cell === undefined || cell.isVisited || cell.isWall) {
        continue;
      }
      parents[cell.row * this.columnCount + cell.column] = data.from;

      if (cell === this.end) {
        found = true;
        break;
      }
      cell.isVisited = true;
      let color = colors.start;
      if (cell !== this.start) {
        color = colors.visited;
      }
      cell.color = colors.currentPointer;
      yield;
      cell.color = color;

      try {
        queue.enqueue({
          curr: this.grid[cell.row + 1][cell.column],
          from: cell,
        });
      } catch (e) {}
      try {
        queue.enqueue({
          curr: this.grid[cell.row - 1][cell.column],
          from: cell,
        });
      } catch (e) {}
      try {
        queue.enqueue({
          curr: this.grid[cell.row][cell.column + 1],
          from: cell,
        });
      } catch (e) {}
      try {
        queue.enqueue({
          curr: this.grid[cell.row][cell.column - 1],
          from: cell,
        });
      } catch (e) {}
    }

    if (found) {
      let current = this.end;
      while (current) {
        if (current !== this.end && current !== this.start) {
          current.color = colors.pathNodeColor;
        }
        current = parents[current.row * this.columnCount + current.column];
        yield;
      }
    }
  }
}
