import React from "react";
import DataAttributes from "src/models/data-attributes";
import { PongGameController } from "src/illustrations/pong-game/controller";

type PropsType = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setDataAttributes: (v: DataAttributes) => void;
};

function Component(props: PropsType) {
  const canvasEl = props.canvasRef.current as HTMLCanvasElement;
  const component = new PongGameController(canvasEl);
  canvasEl.focus();
  canvasEl.tabIndex = 1;
  component.start();

  canvasEl.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      component.onEnterPress();
    } else if (event.key === "Escape") {
      component.onEscapePress();
    }
  });

  canvasEl.addEventListener("mousemove", (event: MouseEvent) => {
    component.onHover(event);
  });

  return <></>;
}

export default Component;
