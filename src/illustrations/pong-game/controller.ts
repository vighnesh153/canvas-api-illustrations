import Canvas from "src/models/canvas";

interface Point {
  x: number;
  y: number;
}

export class PongGameController {
  private readonly canvas: Canvas;
  private interval = setTimeout(() => {}, 0);

  private playerScore = 0;
  private computerScore = 0;

  private gameRunning = false;

  private readonly backgroundColor = "white";
  private readonly outlineColor = "black";
  private readonly homeScreenTextColor = "black";
  private readonly userScoreColor = "green";
  private readonly compScoreColor = "red";

  private readonly paddleWidth = 7;
  private readonly paddleHeight = 70;
  private readonly paddleColor = "red";
  private readonly offset = 20; // border width

  private readonly scoreToWin = 5;
  private readonly pauseTimeDurationInSeconds = 3;

  private readonly maxAbsoluteBallVelocity = 2.5;
  private paddleUser: Point = { x: 20, y: 0 };
  private paddleComp: Point = { x: 0, y: 0 };
  private ball = {
    x: 0,
    y: 0,
    width: 10,
    height: 10,
    velocityX: 1,
    velocityY: 0.3,
    color: "blue",
  };

  constructor(e: HTMLCanvasElement) {
    this.canvas = new Canvas(e);

    this.paddleComp.x =
      this.canvas.width - this.paddleWidth - this.paddleUser.x;
    this.paddleUser.y = this.paddleComp.y =
      (this.canvas.height - this.paddleHeight) / 2;

    this.ball.x = (this.canvas.width - this.ball.width) / 2;
    this.ball.y = (this.canvas.height - this.ball.width) / 2;
  }

  reset() {
    this.ball.x = this.canvas.width / 2;
    this.ball.y = this.canvas.height / 2;

    this.ball.velocityY = 0.3;
  }

  start() {
    this.reset();
    this.interval = setInterval(this.render.bind(this), 1000 / 300);
  }

  stop() {
    this.gameRunning = false;
    clearInterval(this.interval);
    this.render();
  }

  pause() {
    this.reset();
    clearInterval(this.interval);
    this.render();

    if (
      this.playerScore === this.scoreToWin ||
      this.computerScore === this.scoreToWin
    ) {
      return;
    }

    // Pause time printer
    let timeRemaining = this.pauseTimeDurationInSeconds;
    this.writePauseTimeRemaining(timeRemaining--);
    const pauseTimer = setInterval(() => {
      this.writePauseTimeRemaining(timeRemaining);
      timeRemaining--;
    }, 1000);

    // Resume game after 'n' seconds
    setTimeout(() => {
      this.start();
      clearInterval(pauseTimer);
    }, 1000 * this.pauseTimeDurationInSeconds);
  }

  writePauseTimeRemaining(timeRemaining: number) {
    const { canvas, backgroundColor } = this;
    const { width, height } = this.canvas;

    // clear background
    canvas.drawFilledRect(
      width / 2 - 7,
      height / 2 - 125,
      30,
      30,
      backgroundColor
    );
    // write text
    canvas.writeText(
      `${timeRemaining}`,
      width / 2,
      height / 2 - 100,
      35,
      this.homeScreenTextColor
    );
  }

  render() {
    this.drawBackground();
    if (this.gameRunning) {
      this.renderGame();
      this.updateGameState();
    } else {
      this.renderStartScreen();
      clearInterval(this.interval);
    }
  }

  onHover(event: MouseEvent) {
    if (this.canvas) {
      const canvas = this.canvas.getBoundingClientRect;
      const root = document.documentElement;
      this.paddleUser.y =
        event.clientY - canvas.top - root.scrollTop - this.paddleHeight / 2;
      this.boundYCoordinate(this.paddleUser);
    }
  }

  computerMovement() {
    if (this.ball.y > this.paddleComp.y + this.paddleHeight / 2) {
      this.paddleComp.y++;
    } else if (this.ball.y < this.paddleComp.y + this.paddleHeight / 2) {
      this.paddleComp.y--;
    }
    this.boundYCoordinate(this.paddleComp);
  }

  boundYCoordinate(point: Point) {
    const { height } = this.canvas;
    const { offset, paddleHeight } = this;
    point.y = Math.min(point.y, height - offset - paddleHeight);
    point.y = Math.max(point.y, offset);
  }

  onEnterPress() {
    if (!this.gameRunning) {
      this.playerScore = 0;
      this.computerScore = 0;
      this.start();
    }
    this.gameRunning = true;
  }

  onEscapePress() {
    this.stop();
  }

  drawBackground() {
    const { offset, backgroundColor, outlineColor } = this;
    const { width, height } = this.canvas;

    this.canvas.drawFilledRect(0, 0, width, height, backgroundColor);
    this.canvas.drawOutlineRect(
      offset,
      offset,
      width - 2 * offset,
      height - 2 * offset,
      outlineColor
    );
  }

  renderStartScreen() {
    // text
    const t1 = "Click on the canvas and hit 'Enter' to start";
    const t3 = `Your score: ${this.playerScore}`;
    const t4 = `AI score: ${this.computerScore}`;

    const sBX = 210; // scoreBoardX
    const sBY = 160; // scoreBoardY

    const {
      homeScreenTextColor,
      userScoreColor,
      compScoreColor,
      playerScore,
      computerScore,
    } = this;

    this.canvas.writeText(t1, 140, sBY - 20, 30, homeScreenTextColor);

    if (playerScore !== computerScore) {
      let winnerText;
      let winnerTextColor;
      if (playerScore > computerScore) {
        winnerText = "PLAYER WINS!";
        winnerTextColor = userScoreColor;
      } else {
        winnerText = "COMPUTER WINS!";
        winnerTextColor = compScoreColor;
      }
      this.canvas.writeText(winnerText, sBX - 10, sBY, 30, winnerTextColor);
      this.canvas.writeText(t3, sBX, sBY + 20, 20, userScoreColor);
      this.canvas.writeText(t4, sBX + 5, sBY + 40, 20, compScoreColor);
    }
  }

  renderGame() {
    this.drawPaddles();
    this.drawBall();
    this.writeScore();
  }

  updateGameState() {
    this.ball.x += this.ball.velocityX;
    this.ball.y += this.ball.velocityY;

    this.handleWallCollision();
    this.handlePaddleCollision();
    this.computerMovement();

    const { playerScore, scoreToWin, computerScore } = this;
    if (playerScore === scoreToWin || computerScore === scoreToWin) {
      this.stop();
    }
  }

  handleWallCollision() {
    // bottom
    if (this.ball.y + this.ball.height >= this.canvas.height - this.offset) {
      this.ball.velocityY *= -1;
    }

    // top
    if (this.ball.y <= this.offset) {
      this.ball.velocityY *= -1;
    }

    // right
    if (this.ball.x + this.ball.width >= this.canvas.width - this.offset) {
      this.playerScore++;
      this.pause();
    }

    // left
    if (this.ball.x <= this.offset) {
      this.computerScore++;
      this.pause();
    }
  }

  handlePaddleCollision() {
    const {
      ball,
      paddleUser,
      paddleComp,
      paddleHeight,
      paddleWidth,
      offset,
      canvas,
      maxAbsoluteBallVelocity,
    } = this;

    const swapBallYVelocity = () => {
      ball.velocityX *= -1;
      ball.velocityY = ((ball.y - (paddleUser.y + paddleHeight / 2)) * 4) / 75;
      ball.velocityY = Math.max(ball.velocityY, -maxAbsoluteBallVelocity);
      ball.velocityY = Math.min(ball.velocityY, maxAbsoluteBallVelocity);
    };

    // collision with user's paddle
    if (ball.x <= offset + paddleWidth) {
      if (
        ball.y >= paddleUser.y &&
        ball.y + ball.height <= paddleUser.y + paddleHeight
      ) {
        swapBallYVelocity();
      }
    }

    // collision with computer's paddle
    if (ball.x + ball.width >= canvas.width - offset - paddleWidth) {
      if (
        ball.y >= paddleComp.y &&
        ball.y + ball.height <= paddleComp.y + paddleHeight
      ) {
        swapBallYVelocity();
      }
    }
  }

  drawPaddles() {
    const { paddleWidth, paddleHeight, paddleColor } = this;
    {
      const { x, y } = this.paddleUser;
      this.canvas.drawFilledRect(x, y, paddleWidth, paddleHeight, paddleColor);
    }
    {
      const { x, y } = this.paddleComp;
      this.canvas.drawFilledRect(x, y, paddleWidth, paddleHeight, paddleColor);
    }
    {
      // Paddle-like borders
      const { offset } = this;
      const { width, height } = this.canvas;

      this.canvas.drawLine(
        offset,
        offset,
        width - offset,
        offset,
        1,
        paddleColor
      );
      this.canvas.drawLine(
        offset,
        height - offset,
        width - offset,
        height - offset,
        1,
        paddleColor
      );
    }
  }

  drawBall() {
    const { x, y, width, height, color } = this.ball;
    this.canvas.drawFilledRect(x, y, width, height, color);
  }

  writeScore() {
    // text
    const t1 = `Player score: ${this.playerScore}`;
    const t2 = `AI score: ${this.computerScore}`;
    const t3 = `${this.scoreToWin} TO WIN`;

    this.canvas.writeText(t1, 18, 15, 15, this.homeScreenTextColor);
    this.canvas.writeText(t2, 430, 15, 15, this.homeScreenTextColor);
    this.canvas.writeText(t3, 230, 15, 15, this.homeScreenTextColor);
  }
}
