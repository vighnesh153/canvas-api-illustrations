import React, { useEffect } from "react";
import DataAttributes from "src/models/data-attributes";

import FernController from "./fern-controller";

type PropsType = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setDataAttributes: (v: DataAttributes) => void;
};

function Component(props: PropsType) {
  let isAnimating: boolean;

  const animator = (program: FernController) => {
    for (let i = 0; i < 50; i++) {
      program.plot();
      program.update();
    }
    if (isAnimating) {
      requestAnimationFrame(() => animator(program));
    }
  };

  const animationStart = () => {
    if (isAnimating) {
      return;
    }
    const program = new FernController(
      props.canvasRef.current as HTMLCanvasElement
    );
    isAnimating = true;
    animator(program);
  };

  const dataAttributes: DataAttributes = {
    buttons: [
      {
        text: "Start",
        clickHandler: () => {
          animationStart();
        },
      },
    ],
  };
  useEffect(() => {
    props.setDataAttributes(dataAttributes);
    return () => {
      isAnimating = false;
    };
  }, []);

  return <></>;
}

export default Component;
