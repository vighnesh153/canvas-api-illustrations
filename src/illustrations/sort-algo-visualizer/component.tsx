import React, { useEffect } from "react";
import DataAttributes from "src/models/data-attributes";
import SortingVisualizerController from "src/illustrations/sort-algo-visualizer/controller";

type PropsType = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setDataAttributes: (v: DataAttributes) => void;
};

function Component(props: PropsType) {
  const { canvasRef, setDataAttributes } = props;
  const canvasEl = canvasRef.current as HTMLCanvasElement;
  const component = new SortingVisualizerController(canvasEl);

  const dataAttributes: DataAttributes = {
    buttons: [
      {
        text: "START",
        clickHandler: () => {
          component.startAnimation();
        },
      },
      {
        text: "Randomize Array",
        clickHandler: () => {
          component.randomizeArray();
        },
      },
      {
        text: "STOP",
        clickHandler: () => {
          component.stopAnimation();
        },
      },
    ],
    selectFromDropDowns: [
      {
        title: "Algorithm",
        onChange: (value) => {
          component.selectedSortAlgorithm = value;
        },
        options: [
          { returnValue: "bubble", displayText: "Bubble sort" },
          { returnValue: "merge", displayText: "Merge sort" },
          { returnValue: "selection", displayText: "Selection sort" },
          { returnValue: "insertion", displayText: "Insertion sort" },
        ],
        currentValue: "bubble",
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
