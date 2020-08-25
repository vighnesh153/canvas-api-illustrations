import React from "react";
import DataAttributes from "src/models/data-attributes";
import { SnakeGameController } from "./controller";

type PropsType = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setDataAttributes: (v: DataAttributes) => void;
};

function Component(props: PropsType) {
  // remove all the attributes from other non-game components
  props.setDataAttributes({});

  const canvasEl = props.canvasRef.current as HTMLCanvasElement;
  const component = new SnakeGameController(canvasEl);
  canvasEl.tabIndex = 1;
  canvasEl.focus();
  component.start();

  canvasEl.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.key === "Enter") {
      component.onEnterPress();
    } else if (["ArrowDown", "s", "S"].includes(event.key)) {
      component.changeSnakeDirection("10");
    } else if (["ArrowUp", "w", "W"].includes(event.key)) {
      component.changeSnakeDirection("1000");
    } else if (["ArrowLeft", "a", "A"].includes(event.key)) {
      component.changeSnakeDirection("1");
    } else if (["ArrowRight", "d", "D"].includes(event.key)) {
      component.changeSnakeDirection("100");
    }
  });

  return <></>;
}

export default Component;
