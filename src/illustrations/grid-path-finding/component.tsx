import React, { useEffect } from "react";
import DataAttributes from "src/models/data-attributes";
import { GridPathFindingVisualizerController } from "src/illustrations/grid-path-finding/controller";

type PropsType = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setDataAttributes: (v: DataAttributes) => void;
};

function Component(props: PropsType) {
  const { canvasRef, setDataAttributes } = props;

  const component = new GridPathFindingVisualizerController(
    canvasRef.current as HTMLCanvasElement
  );

  const dataAttributes: DataAttributes = {
    buttons: [
      {
        text: "Random Start and End",
        clickHandler: () => {
          component.generateRandomStartAndEnd();
        },
      },
      {
        text: "Random Walls",
        clickHandler: () => {
          component.generateRandomWalls();
        },
      },
      {
        text: "Reset Grid",
        clickHandler: () => {
          component.resetGrid();
        },
      },
      {
        text: "START",
        clickHandler: () => {
          component.startAnimation();
        },
      },
      {
        text: "STOP",
        clickHandler: () => {
          component.stopAnimation();
        },
      },
    ],
  };

  useEffect(() => {
    setDataAttributes(dataAttributes);
    return () => {
      component.stopAnimation();
    };
  }, [setDataAttributes, dataAttributes, component]);

  return <></>;
}

export default Component;
