import React, { useEffect, useRef } from "react";
import DataAttributes from "src/models/data-attributes";
import HilbertCurveController from "src/illustrations/pseudo-hilbert-curve/controller";

type PropsType = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setDataAttributes: (v: DataAttributes) => void;
};

function Component(props: PropsType) {
  const { canvasRef, setDataAttributes } = props;
  const canvasEl = canvasRef.current as HTMLCanvasElement;
  const isAnimating = useRef<boolean>();
  isAnimating.current = false;

  const animate = (program: HilbertCurveController) => {
    if (!isAnimating.current) {
      program.done = true;
      return;
    }
    if (program.done) {
      animationStop();
      return;
    }
    program.plot();
    program.update();
    requestAnimationFrame(() => animate(program));
  };

  const animationStart = (order: number) => {
    if (isAnimating.current) {
      return;
    }
    isAnimating.current = true;

    const program = new HilbertCurveController(canvasEl, order, () => {});
    animate(program);
  };

  const animationStop = () => {
    isAnimating.current = false;
    let id = window.requestAnimationFrame(function () {});
    while (id--) {
      window.cancelAnimationFrame(id);
    }
  };

  const dataAttributes: DataAttributes = {
    numberInputs: [
      {
        title: "Order of curve",
        note: "Maximum is 6",
        min: 1,
        max: 6,
        step: 1,
        currentValue: 5,
        onChange: (value: number) => {
          animationStop();
          setTimeout(() => {
            animationStart(value);
          }, 100);
        },
      },
    ],
  };

  useEffect(() => {
    setDataAttributes(dataAttributes);
    return () => {
      animationStop();
    };
  }, [setDataAttributes, dataAttributes]);

  return <></>;
}

export default Component;
