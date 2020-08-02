import React from "react";
import DataAttributes from "src/models/data-attributes";
import { BrickBreakerController } from "src/illustrations/brick-breaker/controller";

type PropsType = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setDataAttributes: (v: DataAttributes) => void;
};

function Component(props: PropsType) {
  const canvasEl = props.canvasRef.current as HTMLCanvasElement;
  const component = new BrickBreakerController(canvasEl);
  // canvasEl.autofocus = true;
  canvasEl.tabIndex = 1;
  component.start();

  canvasEl.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      component.onEnterPress();
    }
  });

  canvasEl.addEventListener("mousemove", (event: MouseEvent) => {
    component.onHover(event);
  });

  return <></>;
}

export default Component;
