import React, { useEffect } from "react";
import DataAttributes from "src/models/data-attributes";
import SymmetricBinaryTreeController from "src/illustrations/symmetric-binary-tree/controller";

type PropsType = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setDataAttributes: (v: DataAttributes) => void;
};

function Component(props: PropsType) {
  const { canvasRef, setDataAttributes } = props;
  const canvasEl = canvasRef.current as HTMLCanvasElement;

  let currentAngle = 0.47;
  let currentBranchLength = 60;
  let currentBranchScaleDownFactor = 0.75;

  const animate = () => {
    const program = new SymmetricBinaryTreeController(
      canvasEl,
      currentAngle,
      currentBranchScaleDownFactor,
      currentBranchLength
    );
    program.plot();
  };

  let lastUpdate = Date.now();
  const prepAndAnimate = () => {
    if (Date.now() - lastUpdate > 20) {
      lastUpdate = Date.now();
      animate();
    }
  };

  const dataAttributes: DataAttributes = {
    rangeInputs: [
      {
        title: "Angle",
        note: "",
        min: 0,
        max: 2 * Math.PI,
        step: 0.01,
        currentValue: currentAngle,
        onChange: (value: number) => {
          currentAngle = value;
          prepAndAnimate();
        },
      },
      {
        title: "Initial branch length",
        note: "",
        min: 50,
        max: 70,
        step: 0.01,
        currentValue: currentBranchLength,
        onChange: (value: number) => {
          currentBranchLength = value;
          prepAndAnimate();
        },
      },
      {
        title: "Branch length scale down factor",
        note: "",
        min: 0,
        max: 0.75,
        step: 0.01,
        currentValue: currentBranchScaleDownFactor,
        onChange: (value: number) => {
          currentBranchScaleDownFactor = value;
          prepAndAnimate();
        },
      },
    ],
  };

  useEffect(() => {
    setDataAttributes(dataAttributes);
  }, [setDataAttributes, dataAttributes]);

  animate();

  return <></>;
}

export default Component;
