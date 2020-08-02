import React, { useEffect, useRef } from "react";
import DataAttributes from "src/models/data-attributes";
import SierpinskiTriangleController from "./controller";

type PropsType = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setDataAttributes: (v: DataAttributes) => void;
};

function Component(props: PropsType) {
  const { canvasRef, setDataAttributes } = props;
  const canvasEl = canvasRef.current as HTMLCanvasElement;
  const isAnimating = useRef<boolean>();

  const animator = (program: SierpinskiTriangleController) => {
    for (let i = 0; i < 20; i++) {
      program.plot();
      program.update();
    }
    console.log("running");

    if (isAnimating.current) {
      requestAnimationFrame(() => animator(program));
    }
  };

  const animationStart = () => {
    if (isAnimating.current) {
      return;
    }
    isAnimating.current = true;

    const program = new SierpinskiTriangleController(canvasEl);
    animator(program);
  };

  const dataAttributes: DataAttributes = {
    buttons: [
      {
        text: "START",
        clickHandler: () => {
          animationStart();
        },
      },
    ],
  };

  useEffect(() => {
    setDataAttributes(dataAttributes);
    return () => {
      isAnimating.current = false;
    };
  }, [setDataAttributes, dataAttributes]);

  return <></>;
}

export default Component;
