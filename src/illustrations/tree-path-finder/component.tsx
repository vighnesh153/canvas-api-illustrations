import React, { useEffect } from "react";
import DataAttributes from "src/models/data-attributes";
import { TreePathFindingVisualizerController } from "./controller";

type PropsType = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setDataAttributes: (v: DataAttributes) => void;
};

function Component(props: PropsType) {
  const { canvasRef, setDataAttributes } = props;
  const canvasEl = canvasRef.current as HTMLCanvasElement;

  const controller = new TreePathFindingVisualizerController(canvasEl);

  const dataAttributes: DataAttributes = {
    buttons: [
      {
        text: "Randomize Tree",
        clickHandler: () => controller.generateRandomTree(),
      },
      {
        text: "Randomize Src and Dest",
        clickHandler: () => controller.generateRandomStartAndEnd(),
      },
      {
        text: "START",
        clickHandler: () => controller.startAnimation(),
      },
      {
        text: "STOP",
        clickHandler: () => controller.stopAnimation(),
      },
    ],
  };

  useEffect(() => {
    setDataAttributes(dataAttributes);
    return () => {
      controller.stopAnimation();
    };
  }, [setDataAttributes, dataAttributes]);

  return <></>;
}

export default Component;
