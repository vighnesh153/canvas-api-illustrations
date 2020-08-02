import React, { useEffect } from "react";
import DataAttributes from "src/models/data-attributes";

import FernController from "./fern-controller";

type PropsType = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setDataAttributes: (v: DataAttributes) => void;
};

function Component(props: PropsType) {
  let isAnimating = React.useRef<boolean>();

  const animator = (program: FernController) => {
    for (let i = 0; i < 50; i++) {
      program.plot();
      program.update();
    }
    if (isAnimating.current) {
      requestAnimationFrame(() => animator(program));
    }
  };

  const animationStart = () => {
    if (isAnimating.current) {
      return;
    }
    const program = new FernController(
      props.canvasRef.current as HTMLCanvasElement
    );
    isAnimating.current = true;
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
      isAnimating.current = false;
    };
  }, []);

  return <></>;
}

export default Component;
