import React from "react";
import DataAttributes from "src/models/data-attributes";
import { FlappyBlockGameController } from "./controller";

type PropsType = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setDataAttributes: (v: DataAttributes) => void;
};

function Component(props: PropsType) {
  // remove all the attributes from other non-game components
  props.setDataAttributes({});

  const canvasEl = props.canvasRef.current as HTMLCanvasElement;
  const gameController = new FlappyBlockGameController(canvasEl);
  canvasEl.focus();
  canvasEl.tabIndex = 1;
  gameController.start();

  canvasEl.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      gameController.onSpacePress();
    }
  });

  return <></>;
}

export default Component;
